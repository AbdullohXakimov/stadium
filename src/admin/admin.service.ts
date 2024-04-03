import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { hashed_password } = createAdminDto;
    const hashed_pass = await bcrypt.hash(hashed_password, 7);
    createAdminDto.hashed_password = hashed_pass;

    return this.adminRepo.create(createAdminDto);
  }

  findAll() {
    return this.adminRepo.findAll();
  }

  findOne(id: number) {
    return this.adminRepo.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updatedVersion = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updatedVersion[0][1];
  }

  remove(id: number) {
    return this.adminRepo.destroy({ where: { id } });
  }

  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { login, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { login } });
    if (!admin) throw new BadRequestException('Admin not found');
    if (!admin.is_active) throw new BadRequestException('Admin is not active');
    console.log('ok');

    const isMatchpass = await bcrypt.compare(password, admin.hashed_password);

    if (!isMatchpass) {
      throw new BadRequestException('Password do not match');
    }
    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedUser = await this.adminRepo.update(
      {
        hashed_refresh_token,
        is_active: true,
      },
      { where: { id: admin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logOut(refreshToken: string, res: Response) {
    const admindata = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!admindata) throw new ForbiddenException('Token not found');

    const updateUser = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: admindata.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged Out successfully',
      user_refresh_token: updateUser[1][0].hashed_refresh_token,
    };
    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    console.log('Oke');

    const decodedToken = await this.jwtService.decode(refreshToken);
    if (userId !== decodedToken['id']) {
      throw new BadRequestException('Admin not matched');
    }
    const user = await this.adminRepo.findByPk(userId);
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('Refresh token not found');
    }
    const isMatchedtoken = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!isMatchedtoken) throw new ForbiddenException('Forbidden');
    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedUser = await this.adminRepo.update(
      {
        hashed_refresh_token,
      },
      { where: { id: user.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User refreshed',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }
}

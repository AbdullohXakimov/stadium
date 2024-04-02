import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { where } from 'sequelize';
import { MailService } from '../mail/mail.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
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

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('The email is busy');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Password is wrong!');
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const activation_link = v4();
    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token,
        activation_link,
      },
      { where: { id: newUser.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendMailtoUser(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error in sending message');
    }

    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async activate(link: string) {
    if (!link) throw new BadRequestException('Activation link not found');
    const updated = await this.userRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updated[1][0]) throw new BadRequestException('User already activated');
    const response = {
      message: 'User activated successfully',
      user: updated[1][0].is_active,
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('User not found');
    if (!user.is_active) throw new BadRequestException('User is not active');

    const isMatchpass = await bcrypt.compare(password, user.hashed_password);

    if (!isMatchpass) {
      throw new BadRequestException('Password do not match');
    }
    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedUser = await this.userRepo.update(
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
      message: 'User logged',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logOut(refreshToken: string, res: Response) {
    const userdata = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userdata) throw new ForbiddenException('Token not found');

    const updateUser = await this.userRepo.update(
      { hashed_refresh_token: null },
      { where: { id: userdata.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged Out successfully',
      user_refresh_token: updateUser[1][0].hashed_refresh_token,
    };
    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    console.log("Oke");
    
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (userId !== decodedToken['id']) {
      throw new BadRequestException('User not matched');
    }
    const user = await this.userRepo.findByPk(userId);
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
    const updatedUser = await this.userRepo.update(
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface IUSerCreationInterface {
  full_name: string;
  phone: string;
  email: string;
  hashed_password: string;
  tg_link: string;
  photo: string;
  is_active: boolean;
  is_owner: boolean;
  hashed_refresh_token: string;
}
@Table({ tableName: 'Users' })
export class User extends Model<User, IUSerCreationInterface> {
  @ApiProperty({
    example: 1,
    description: "User's unique ID number",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Aziz Qodirov',
    description: "User's full name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({
    example: '+998 93 123 45 67',
    description: "User's phone number",
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'Aziz@gmail.com',
    description: "User's email",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'Aziz Qodirov',
    description: "User's full name",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'Aziz Qodirov',
    description: "User's full name",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'Aziz Qodirov',
    description: "User's full name",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  is_owner: boolean;

  @ApiProperty({
    example: 'Aziz Qodirov',
    description: "User's full name",
  })
  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @ApiProperty({
    example: 'Aziz Qodirov',
    description: "User's full name",
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: 'Aziz Qodirov',
    description: "User's full name",
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}

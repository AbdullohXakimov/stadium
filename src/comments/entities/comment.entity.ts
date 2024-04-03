import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Stadium } from '../../stadiums/entities/stadium.entity';
import { User } from '../../users/entities/user.entity';

interface ICommentInter {
  user_id: number;
  stadium_id: number;
  impression: string;
}

@Table({ tableName: 'Comment' })
export class Comment extends Model<Comment> implements ICommentInter {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User) // Assuming User is the related model
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Stadium) // Assuming Stadium is the related model
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadium_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  impression: string;
}

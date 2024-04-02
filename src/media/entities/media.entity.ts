interface IMediaInter {
    stadium_id: number
    photo: string
    description: string
}


import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'; 
import { Stadium } from '../../stadiums/entities/stadium.entity'; // Import the Stadium model if it's in a separate file

@Table({ tableName: 'Media' })
export class Media extends Model<Media> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Stadium) // Define a foreign key relationship with the Stadium model
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadium_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}

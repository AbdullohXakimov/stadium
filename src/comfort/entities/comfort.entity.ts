import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IComfortInterface {
  name: string;
}
@Table({ tableName: 'Comfort' })
export class Comfort extends Model<Comfort, IComfortInterface> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}

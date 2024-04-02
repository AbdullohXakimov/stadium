import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICategoryInterface {
  name: string;
  parent_id: number;
}

@Table({ tableName: 'Categories' })
export class Category extends Model<Category, ICategoryInterface> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  parent_id: number;
}

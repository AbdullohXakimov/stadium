import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IDistrictInter {
  name: string;
  parent_id: number;
}
@Table({ tableName: 'District' })
export class District extends Model<District, IDistrictInter> {
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

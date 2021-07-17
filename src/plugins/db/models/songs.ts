import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface SongsAttributes {
    id?: number;
    song: string;
    singer: string;
    createdBy?: string;
    createdDate?: Date;
    LastUpdatedDate?: Date;
    LastUpdatedBy?: string;
}
export interface SongsModel extends Model<SongsAttributes>, SongsAttributes { }
export class Songs extends Model<SongsModel, SongsAttributes> { }

export type SongsStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): SongsModel;
};

export function SongsFactory(sequelize: Sequelize): SongsStatic {
    return <SongsStatic>sequelize.define("Songs", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        song: { type: DataTypes.STRING, allowNull: false, unique: true },
        singer: { type: DataTypes.STRING, allowNull: false, unique: true },
        createdDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
        createdBy: { type: DataTypes.STRING, allowNull: false },
        LastUpdatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: true },
        LastUpdatedBy: { type: DataTypes.STRING, allowNull: true },
    });
}



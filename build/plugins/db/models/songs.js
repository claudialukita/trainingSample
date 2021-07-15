"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsFactory = exports.Songs = void 0;
const sequelize_1 = require("sequelize");
class Songs extends sequelize_1.Model {
}
exports.Songs = Songs;
function SongsFactory(sequelize) {
    return sequelize.define("Songs", {
        id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        song: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        singer: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        createdDate: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW, allowNull: false },
        createdBy: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        LastUpdatedDate: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW, allowNull: true },
        LastUpdatedBy: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    });
}
exports.SongsFactory = SongsFactory;
//# sourceMappingURL=songs.js.map
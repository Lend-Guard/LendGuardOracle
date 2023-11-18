import { DataTypes } from "sequelize";
import { engine } from "./engine.js";


export const UserModel = engine.define(
    'UserModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    healthRatioNotification: {
        type: DataTypes.FLOAT,
    },
    healthRatioExecution: {
        type: DataTypes.FLOAT,
    },
    targetHealthRatio: {
        type: DataTypes.FLOAT,
    },
    address: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'user_model',
    timestamps: false,
});

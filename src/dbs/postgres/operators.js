import sequelize from "sequelize";
import {engine} from "./engine.js";
import {UserModel} from "./models.js";


export async function getAvailableOperatorsInfo() {
    const rawUserData = await engine.query(
        "select distinct * from user_model", {
            type: sequelize.QueryTypes.SELECT
        }
    );

    return rawUserData.map(rawUsersData => UserModel.build(rawUserData).validate());
}

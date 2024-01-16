import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("orders", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        clientId: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    });
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("orders");
};

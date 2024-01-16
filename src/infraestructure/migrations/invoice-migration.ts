import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("Invoices", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        document: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        street: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        number: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        complement: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        state: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        zipCode: {
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

    await sequelize.getQueryInterface().createTable("invoiceItems", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        invoiceId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable("Invoices");
    await sequelize.getQueryInterface().dropTable("invoiceItems");
};

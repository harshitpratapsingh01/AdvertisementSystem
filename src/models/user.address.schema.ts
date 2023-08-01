import { sequelize } from "../core/dbConnection";
import Sequelize from "sequelize";

const Address = sequelize.define('address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    house_no: {
        type: Sequelize.STRING,
        allowNull: false
    },
    street_no: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    area: {
        type: Sequelize.STRING,
        allowNull: false
    },
    landmark: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zipCode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    addressType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        default: Date.now()
    },
    updatedAt: {
        type: Sequelize.DATE,
        default: Date.now()
    }
});

(async function () {
    await Address.sync({ alter: true });
})();

export {Address}
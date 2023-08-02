import { sequelize } from "../core/dbConnection";
import Sequelize from "sequelize";

const Session = sequelize.define('session', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    status: { type: Sequelize.BOOLEAN, allowNull: false, default: false },
    createdAT: { type: Sequelize.DATE, default: Date.now() },
    updatedAT: { type: Sequelize.DATE, default: Date.now() }
});

(async function () {
    await Session.sync();
})();

export default Session;
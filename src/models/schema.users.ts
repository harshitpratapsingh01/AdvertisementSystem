import Sequelize from "sequelize";
import { sequelize } from "../core/dbConnection";

const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING, unique: true, allowNull: false },
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    mobile_no: { type: Sequelize.STRING, allowNull: false },
    gender: { type: Sequelize.ENUM("Male", "Female"), allowNull: false },
    dob: { type: Sequelize.DATE, allowNull: false },
    status: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    profilePic: { type: Sequelize.BLOB, allowNull: true },
    createdAt: { type: Sequelize.DATE, default: Date.now() },
    updatedAt: { type: Sequelize.DATE, default: Date.now() }
});

(async function () {
    await User.sync();
})();

export { User};
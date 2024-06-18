import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password')) {
                // Hash the password before saving to the database
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

// Method to compare passwords for login
User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default User;

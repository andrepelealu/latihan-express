'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {      
       users.hasMany(models.pekerjaan,{
         foreignKey:'id'
       })    
    }
  };
  users.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          arg:true,
          msg: 'name is required'
        }

      }
    },

    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail : true,
        msg : 'input must be email'
      }
    },
    phone_number: DataTypes.STRING,
    gender: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
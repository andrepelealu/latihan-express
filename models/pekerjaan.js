'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pekerjaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      pekerjaan.belongsTo(models.users,{
        foreignKey:'id'
      })

    }
  };
  pekerjaan.init({
    pekerjaan: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          arg:true,
          msg: "field cannot empty"
        }
      }
    }

  }, {
    sequelize,
    modelName: 'pekerjaan'
  });
  return pekerjaan;
};
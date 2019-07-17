module.exports = function (sequelize, DataTypes) {
  var Meme = sequelize.define("Meme", {
    meme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW()
    }
  });

//   Meme.associate = function(models) {
//     // A Post should belong to User
//     // A post can't be created without a User due to the foreign key
//     Meme.belongsTo(models.UserInfo, {
//       foreignKey: {
//         allowNull: false
//       }
//     }); 
//   };
  
  return Meme;
};
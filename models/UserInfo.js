module.exports = function (sequelize, DataTypes) {
  var UserInfo = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,250]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,250]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,250],
        isEmail: true,
        unique: true
      }
    }
  });

  UserInfo.associate = function(models) {
    // Associating Users with Memes
    // When a User is deleted, also delete associated memes
    UserInfo.hasMany(models.Meme, {
      onDelete: "cascade"
    }); 
  };

  UserInfo.associate = function(models) {
    // Associating Users with Likes
    // When a User is deleted, also delete associated likes
    UserInfo.hasMany(models.Likes, {
      onDelete: "cascade"
    }); 
  };
  
  return UserInfo;
};
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
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

  User.associate = function(models) {
    // Associating Users with Memes
    // When a User is deleted, also delete associated memes
    User.hasMany(models.Meme, {
      onDelete: "cascade"
    }); 
  };

  User.associate = function(models) {
    // Associating Users with Likes
    // When a User is deleted, also delete associated likes
    User.hasMany(models.Like, {
      onDelete: "cascade"
    }); 
  };
  
  return User;
};
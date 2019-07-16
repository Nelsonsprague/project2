module.exports = function (sequelize, DataTypes) {
  var Likes = sequelize.define("Likes", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });

  Likes.associate = function(models) {
    // A Post should belong to User
    // A post can't be created without a User due to the foreign key
    Likes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    }); 
  };
  
  return Likes;
};
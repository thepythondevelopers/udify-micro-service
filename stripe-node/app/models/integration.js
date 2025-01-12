require('dotenv').config();
module.exports = (sequelize, Sequelize) => {
    const Integration = sequelize.define("integration", {
      guid : {
          type: Sequelize.CHAR(32),
        primaryKey: true,
      },
      store_api_key: {
        type: Sequelize.CHAR(32),
        required : true,
        allowNull: false,
      },
      store_api_secret: {
        type: Sequelize.CHAR(32),
        required: true,
        allowNull: false,
      },
      domain:{
        type: Sequelize.STRING,
        required : true,
        allowNull: false,
      },
      access_token:{
        type: Sequelize.STRING,
        required : true,
      },
      created_at :{
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      store_id:{
        type: Sequelize.CHAR(32),
        required : true,
      }, 
	deleted_at:{
        type: Sequelize.DATE,
    },
    account_id: {
        type: Sequelize.UUID,
        required : true,
        allowNull: false,
        references: {
            model: 'accounts',
            key: 'guid'
        }
    }  
    },{
      timestamps: false
  });
    return Integration;
  };

	
	
	

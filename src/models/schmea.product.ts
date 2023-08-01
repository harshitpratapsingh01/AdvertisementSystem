import { sequelize } from "../core/dbConnection";
import Sequelize from "sequelize";

const Product = sequelize.define('Product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.BLOB),
      allowNull: true,
    },
    heigher_bidding_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    Bidderid: {
      type: Sequelize.INTEGER,
      allowNull: true,
      reference:{
          model:'User',
          key:'id'
      }
    },
    base_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    seller_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference:{
          model:'User',
          key:'id'
      }
    },
    subcategory: {
      type: Sequelize.STRING,
      allowNull: false,
      reference:{
          model:'Category',
          key:'Subcategory'
      }
    }
  });
  
  (async function () {
      await Product.sync({alter: true});
  })();
  
  export {Product}
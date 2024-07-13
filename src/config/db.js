const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({ path: envPath });
const sequelize = new Sequelize(
  "Market_place_bot",
  "avnadmin",
  "", //ADD aiven DB password
  {
    dialect: "mysql",
    host: "market-place-bot-yamifikru4-4606.i.aivencloud.com",
    port: "15107",
    logging: false,
    sslmode: "REQUIRED",
  }
);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

//***************************************************************************************** */
//use this block of code(sequelize.sync) if you to alter or add new table to the database
//****************************************************************************************** */

// sequelize.sync({ alter: true })
//     .then(() => {
//         console.log('Database synchronized with alterations.');
//     })
//     .catch((error) => {
//         console.error('Error synchronizing database:', error);
//     });

async function syncDatabase() {
  try {
    // await sequelize.sync({ force: true }); // Use an object to specify options
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

syncDatabase();

module.exports = { sequelize };

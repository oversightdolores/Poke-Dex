require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE
} = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: PG_DATABASE,
        dialect: "postgres",
        host: PG_HOST,
        port: PG_PORT,
        username: PG_USER,
        password: PG_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/pokemon`,
        { logging: false, native: false }
      );

/* const sequelize = new Sequelize(`postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
}); */
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Pokemon.belongsToMany(Type, { through: 'pokemon_type' , forinkey: 'typeId' });
Type.belongsToMany(Pokemon, { through: 'pokemon_type' });



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const suratKeluar = db.define(
  "suratkeluar",
  {
    nomorurut_satu: DataTypes.STRING,
    klas_satu: DataTypes.STRING,
    tanggal_satu: DataTypes.STRING,
    nomorurut_dua: DataTypes.STRING,
    klas_dua: DataTypes.STRING,
    tanggal_dua: DataTypes.STRING,
    nomorurut_tiga: DataTypes.STRING,
    klas_tiga: DataTypes.STRING,
    tanggal_tiga: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = suratKeluar;

(async () => {
  await db.sync();
})();

const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const suratKeluar = db.define(
  "suratkeluar",
  {
    nomor_urut: DataTypes.INTEGER,
    klas: DataTypes.STRING,
    tanggal: DataTypes.DATEONLY,
  },
  {
    freezeTableName: true,
  }
);

module.exports = suratKeluar;

(async () => {
  await db.sync();
})();

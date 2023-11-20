const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const requestModel = db.define(
  "request",
  {
    bidang: DataTypes.STRING,
    tanggal: DataTypes.DATEONLY,
    nomor_surat: DataTypes.STRING,
    img: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = requestModel;

(async () => {
  await db.sync();
})();

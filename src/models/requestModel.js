const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const requestModel = db.define(
  "request",
  {
    bidang: DataTypes.STRING,
    perihal: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    nomor_surat: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = requestModel;

(async () => {
  await db.sync();
})();

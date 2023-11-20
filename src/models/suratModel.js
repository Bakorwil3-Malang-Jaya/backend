const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const suratModel = db.define(
  "surat",
  {
    nomor_agenda: DataTypes.STRING,
    tgl_diterima: DataTypes.DATEONLY,
    tgl_surat: DataTypes.DATEONLY,
    nomor_surat: DataTypes.STRING,
    pengirim: DataTypes.STRING,
    perihal: DataTypes.STRING,
    sifat: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    tahun: DataTypes.INTEGER,
    fileSurat: DataTypes.STRING,
    ditujukan: DataTypes.STRING,
    posisi: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = suratModel;

(async () => {
  await db.sync();
})();

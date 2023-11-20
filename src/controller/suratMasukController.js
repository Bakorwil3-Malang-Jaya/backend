const suratModel = require("../models/suratModel.js");
const path = require("path");
const fs = require("fs");
const { response } = require("express");

// CONTROLLER ENTRY
const get = async (req, res) => {
  try {
    const response = "HEYYY JUDE BELLINGHAM";
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET ALL SURAT
const getSurat = async (req, res) => {
  try {
    const response = await suratModel.findAll();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET ALL SURAT
const getCountSurat = async (req, res) => {
  try {
    const response = await suratModel.findAndCountAll();
    const total = response.count;
    res.json({ total });
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
const getSuratById = async (req, res) => {
  try {
    const response = await suratModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    response;
  }
};

// CONTROLLER CREATE SURAT
const createSurat = (req, res) => {
  // check if request file nothing
  if (req.files === null)
    return res.status(400).json({ message: "no file uploaded" });

  // request body
  const nomor_agenda = req.body.nomor_agenda;
  const tgl_diterima = req.body.tgl_diterima;
  const tgl_surat = req.body.tgl_surat;
  const nomor_surat = req.body.nomor_surat;
  const pengirim = req.body.pengirim;
  const perihal = req.body.perihal;
  const sifat = req.body.sifat;
  const ditujukan = req.body.ditujukan;
  const posisi = req.body.posisi;
  const keterangan = req.body.keterangan;
  const tahun = req.body.tahun;
  const fileSurat = req.files.fileSurat;

  // filename and url
  const ext = path.extname(fileSurat.name);
  // const timestamp = new Date().getTime();
  const fileName = fileSurat.name;
  const url = `${req.protocol}://${process.env.DOMAIN}:4000/SuratMasuk/${fileName}`;

  // allowed type extension image
  const allowedType = [".docx", ".pdf"];

  // validate images extensions
  if (!allowedType.includes(ext.toLocaleLowerCase()))
    return res.status(422).json({ message: "invalid file" });

  // if all requirements are fulfilled save image to public folder
  fileSurat.mv(`./public/SuratMasuk/${fileName}`, async (err) => {
    // check if there is an error
    if (err) return res.status(500).json({ message: err.message });
    // if there are no errors save data to database
    try {
      await suratModel.create({
        nomor_agenda: nomor_agenda,
        tgl_diterima: tgl_diterima,
        tgl_surat: tgl_surat,
        nomor_surat: nomor_surat,
        pengirim: pengirim,
        perihal: perihal,
        sifat: sifat,
        keterangan: keterangan,
        ditujukan: ditujukan,
        posisi: posisi,
        tahun: tahun,
        fileSurat: fileName,
        url: url,
      });
      res.status(201).json({ message: "creating surat masuk success" });
    } catch (error) {
      res.json({
        message: "creating surat masuk failed",
        error: error,
      });
    }
  });
};

// CONTROLLER UPDATE SURAT
const updateSurat = async (req, res) => {
  // cek if there is data by id
  const suratMasuk = await suratModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!suratMasuk)
    return res.status(404).json({
      message: "No Data Found",
    });

  let fileName = "";

  // cek if request file is nothing
  if (req.files === null) {
    // take file filename from the database
    fileName = suratModel.fileSurat;
  } else {
    // if update file
    const fileSurat = req.files.fileSurat;
    const ext = path.extname(fileSurat.name);
    // const timestamp = new Date().getTime();
    fileName = fileSurat;
    // allowed type extension image
    const allowedType = [".docx", ".pdf"];
    // validate extensions file
    if (!allowedType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({ message: "invalid file" });

    // delete old file
    const filepath = `./public/suratMasuk/${suratMasuk.fileSurat}`;
    fs.unlinkSync(filepath);

    // save new file
    fileSurat.mv(`./public/suratMasuk/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });
  }

  // request new update
  const nomor_agenda = req.body.nomor_agenda;
  const tgl_diterima = req.body.tgl_diterima;
  const tgl_surat = req.body.tgl_surat;
  const nomor_surat = req.body.nomor_surat;
  const pengirim = req.body.pengirim;
  const perihal = req.body.perihal;
  const ditujukan = req.body.ditujukan;
  const posisi = req.body.posisi;
  const sifat = req.body.sifat;
  const keterangan = req.body.keterangan;
  const tahun = req.body.tahun;
  const url = `${req.protocol}://${process.env.DOMAIN}:4000/SuratMasuk/${fileName}`;

  // save update to database
  try {
    await suratModel.update(
      {
        nomor_agenda: nomor_agenda,
        tgl_diterima: tgl_diterima,
        tgl_surat: tgl_surat,
        nomor_surat: nomor_surat,
        pengirim: pengirim,
        perihal: perihal,
        sifat: sifat,
        keterangan: keterangan,
        ditujukan: ditujukan,
        posisi: posisi,
        tahun: tahun,
        fileSurat: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "suratMasuk Updated Successfully" });
  } catch (error) {
    res.json({
      message: "suratMasuk update gagal",
      error: error,
    });
  }
};

// CONTROLLER DELETE SURAT
const deleteSurat = async (req, res) => {
  const suratMasuk = await suratModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!suratMasuk) return res.status(404).json({ message: "No Data Found" });

  // if there is data
  try {
    const filepath = `./public/SuratMasuk/${suratMasuk.fileSurat}`;
    // delete file in the filepath
    fs.unlinkSync(filepath);
    // delete file in databases by id
    await suratModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "suratMasuk Deleted Success" });
  } catch (error) {
    res.json({
      message: "suratMasuk delete gagal",
      Error: error,
    });
  }
};

module.exports = {
  get,
  getSurat,
  getCountSurat,
  getSuratById,
  createSurat,
  updateSurat,
  deleteSurat,
};

const requestModel = require("../models/requestModel.js");
const path = require("path");
const fs = require("fs");
const { response } = require("express");

// CONTROLLER GET ALL REQUEST
const getRequest = async (req, res) => {
  try {
    const response = await requestModel.findAll();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET ALL REQUEST
const getCountRequest = async (req, res) => {
  try {
    const response = await requestModel.findAndCountAll();
    const total = response.count;
    res.json({ total });
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET REQUEST BY ID
const getRequestById = async (req, res) => {
  try {
    const response = await requestModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    response;
  }
};

// CONTROLLER CREATE REQUEST
const createRequest = async (req, res) => {
  // check jika request img file tidak ada
  if (req.files === null)
    return res.status(400).json({
      message: "no file uploaded",
    });

  // request body
  const bidang = req.body.bidang;
  const tanggal = req.body.tanggal;
  const nomor_surat = req.body.nomor_surat;
  const img = req.files.img;

  // filename and url
  const ext = path.extname(img.name);
  const fileName = img.md5 + ext;
  const url = `${req.protocol}://${process.env.DOMAIN}:4000/request/${fileName}`;

  // allowed type extension image
  const allowedType = [".jpg", ".jpeg", ".png"];

  // validate images extensions
  if (!allowedType.includes(ext.toLocaleLowerCase()))
    return res.status(422).json({ message: "invalid type file" });

  // jika semua syarat terpenuhi
  img.mv(`./public/request/${fileName}`, async (err) => {
    // check jika ada error
    if (err) return res.status(500).json({ message: err.message });
    // jika tidak ada error save semua request data ke database
    try {
      await requestModel.create({
        bidang: bidang,
        tanggal: tanggal,
        nomor_surat: nomor_surat,
        img: fileName,
        url: url,
      });
      res.status(201).json({ message: "creating request surat success" });
    } catch (error) {
      res.json({
        message: "creating request surat failed",
        error: error,
      });
    }
  });
};

// CONTROLLER UPDATE REQUEST
const updateRequest = async (req, res) => {
  const requestSurat = await requestModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!requestSurat)
    return res.status(404).json({
      message: "No Data Found",
    });

  let fileName = "";

  if (!req.files || !req.files.img) {
    fileName = requestSurat.img;
  } else {
    const img = req.files.img;
    const ext = path.extname(img.name);
    fileName = img.md5 + ext;

    const allowedType = [".jpg", ".jpeg", ".png"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ message: "Invalid file type" });

    const filepath = `./public/request/${requestSurat.img}`;
    try {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    } catch (err) {
      return res.status(500).json({
        message: "Error deleting old file",
      });
    }

    img.mv(`./public/request/${fileName}`, (err) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });
    });
  }

  const bidang = req.body.bidang;
  const tanggal = req.body.tanggal;
  const nomor_surat = req.body.nomor_surat;
  const url = `${req.protocol}://${process.env.DOMAIN}:4000/request/${fileName}`;

  try {
    await requestModel.update(
      {
        bidang: bidang,
        tanggal: tanggal,
        nomor_surat: nomor_surat,
        img: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Request surat berhasil diupdate" });
  } catch (error) {
    res.json({
      message: "Request surat update gagal",
      error: error,
    });
  }
};

// CONTROLLER DELETE REQUEST
const deleteRequest = async (req, res) => {
  const requestSurat = await requestModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  // cek if there is no data
  if (!requestSurat)
    return res.status(404).json({ mesbbsage: "No Data Found" });

  // if there is data
  try {
    const filepath = `./public/request/${requestSurat.img}`;
    // delete file in the filepath
    fs.unlinkSync(filepath);
    // delete file in databases by id
    await requestModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "request surat hapus berhasil" });
  } catch (error) {
    res.json({
      message: "request hapus gagal",
      Error: error,
    });
  }
};

module.exports = {
  getRequest,
  getCountRequest,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
};

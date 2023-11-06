const suratKeluar = require("../models/suratKeluar.js");
const { response } = require("express");

// CONTROLLER GET ALL SURAT
const getSuratKeluar = async (req, res) => {
  try {
    const response = await suratKeluar.findAll();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET ALL SURAT
const getCountSuratKeluar = async (req, res) => {
  try {
    const response = await suratKeluar.findAndCountAll();
    const total = response.count;
    res.json({ total });
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
const getSuratKeluarById = async (req, res) => {
  try {
    const response = await suratKeluar.findOne({
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
const createSuratKeluar = async (req, res) => {
    try {
        await suratKeluar.create(req.body)    
        res.status(201).json({message: "creating surat keluar success"})
    } catch (error) {
        res.json({
            message: "creating surat keluar failed",
            error: error
        })
    }
  
};

// CONTROLLER UPDATE SURAT
const updateSuratKeluar = async (req, res) => {
    try {
        await suratKeluar.update(req.body, {
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          message: "update surat keluar success",
        });
      } catch (error) {
        res.json({
          message: "update surat keluar failed",
          error: error,
        });
      }
};

// CONTROLLER DELETE SURAT
const deleteSuratKeluar = async (req, res) => {
    try {
        await suratKeluar.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(201).json({
          message: "surat keluar delete success",
        });
      } catch (error) {
        res.json({
          message: "surat keluar delete failed",
          error: error,
        });
      }
};

module.exports = {
  getSuratKeluar,
  getCountSuratKeluar,
  getSuratKeluarById,
  createSuratKeluar,
  updateSuratKeluar,
  deleteSuratKeluar,
};

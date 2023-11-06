const requestModel = require("../models/requestModel.js");
const { response } = require("express");

// CONTROLLER GET ALL SURAT
const getRequest = async (req, res) => {
  try {
    const response = await requestModel.findAll();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET ALL SURAT
const getCountRequest = async (req, res) => {
  try {
    const response = await requestModel.findAndCountAll();
    const total = response.count;
    res.json({ total });
  } catch (error) {
    res.json(error);
  }
};

// CONTROLLER GET SURAT BY ID
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

// CONTROLLER CREATE SURAT
const createRequest = async (req, res) => {
    try {
        await requestModel.create(req.body)    
        res.status(201).json({message: "creating request success"})
    } catch (error) {
        res.json({
            message: "creating request failed",
            error: error
        })
    }
  
};

// CONTROLLER UPDATE SURAT
const updateRequest = async (req, res) => {
    try {
        await requestModel.update(req.body, {
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          message: "update request success",
        });
      } catch (error) {
        res.json({
          message: "update request failed",
          error: error,
        });
      }
};

// CONTROLLER DELETE SURAT
const deleteRequest = async (req, res) => {
    try {
        await requestModel.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(201).json({
          message: "request delete success",
        });
      } catch (error) {
        res.json({
          message: "request delete failed",
          error: error,
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

const express = require("express");
const {
  getSurat,
  getCountSurat,
  getSuratById,
  createSurat,
  updateSurat,
  deleteSurat,
  get,
} = require("../controller/suratMasukController.js");

const router = express.Router();

// ROUTE GET
router.get("/", get);
// ROUTE GET ALL SURAT
router.get("/surat", getSurat);
// ROUTE GET COUNT SURAT
router.get("/suratcount", getCountSurat);
// ROUTE GET SURAT BY ID
router.get("/surat/:id", getSuratById);
// ROUTE CREATE SURAT
router.post("/surat", createSurat);
// ROUTE EDIT SURAT
router.patch("/surat/:id", updateSurat);
// ROUTE DELETE SURAT
router.delete("/surat/:id", deleteSurat);

module.exports = router;

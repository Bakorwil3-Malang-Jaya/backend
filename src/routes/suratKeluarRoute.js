const express = require("express");
const {
  getSuratKeluar,
  getCountSuratKeluar,
  getSuratKeluarById,
  createSuratKeluar,
  updateSuratKeluar,
  deleteSuratKeluar,
} = require("../controller/suratKeluarController.js");

const router = express.Router();

// ROUTE GET ALL SURAT
router.get("/suratkeluar", getSuratKeluar);
// ROUTE GET COUNT SURAT
router.get("/suratkeluarcount", getCountSuratKeluar);
// ROUTE GET SURAT BY ID
router.get("/suratkeluar/:id", getSuratKeluarById);
// ROUTE CREATE SURAT
router.post("/suratkeluar", createSuratKeluar);
// ROUTE EDIT SURAT
router.patch("/suratkeluar/:id", updateSuratKeluar);
// ROUTE DELETE SURAT
router.delete("/suratkeluar/:id", deleteSuratKeluar);

module.exports = router;
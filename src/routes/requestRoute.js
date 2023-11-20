const express = require("express");
const {
  getRequest,
  getCountRequest,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
} = require("../controller/requestController.js");

const router = express.Router();

// ROUTE GET ALL request
router.get("/requestt", getRequest);
// ROUTE GET COUNT request
router.get("/requestcountt", getCountRequest);
// ROUTE GET request BY ID
router.get("/requestt/:id", getRequestById);
// ROUTE CREATE request
router.post("/requestt", createRequest);
// ROUTE EDIT request
router.patch("/requestt/:id", updateRequest);
// ROUTE DELETE request
router.delete("/requestt/:id", deleteRequest);

module.exports = router;

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
router.get("/request", getRequest);
// ROUTE GET COUNT request
router.get("/requestcount", getCountRequest);
// ROUTE GET request BY ID
router.get("/request/:id", getRequestById);
// ROUTE CREATE request
router.post("/request", createRequest);
// ROUTE EDIT request
router.patch("/request/:id", updateRequest);
// ROUTE DELETE request
router.delete("/request/:id", deleteRequest);

module.exports = router;

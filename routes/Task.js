const express = require("express");
const {
  getTasks,
  createTask,
  UpdateTask,
  deleteTask,
} = require("../controllers/Task.js");
const router = express.Router();

router.get("/:id", getTasks);
router.post("/", createTask);
router.patch("/", UpdateTask);
router.delete("/:id", deleteTask);

module.exports = router;

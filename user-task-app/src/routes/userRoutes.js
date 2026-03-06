const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const userController = require("../controllers/userController");

router.get("/me", auth, userController.getProfile);

router.get("/", auth, role("admin"), userController.getAllUsers);

router.delete("/:id", auth, role("admin"), userController.deleteUser);

module.exports = router;
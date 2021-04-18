const express = require("express");
const router = express.Router();

const { getMe } = require("../controllers/auth");

const { verifyUser } = require("../middleware/auth");

router.get("/me", verifyUser, getMe);



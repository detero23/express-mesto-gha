const router = require("express").Router();
const { getUserById, getUsers, createUser } = require("../controllers/users");

router.get("/:id", getUserById);
router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;

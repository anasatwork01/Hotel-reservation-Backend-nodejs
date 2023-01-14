const express = require("express"); 
const { updateUser, deleteUser, getUser, getAllUsers } = require("../controllers/user");
const {verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();



//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser,deleteUser);

//GET
router.get("/:id",verifyUser,getUser);

//GET ALL
router.get("/",verifyAdmin,getAllUsers);

module.exports = router;
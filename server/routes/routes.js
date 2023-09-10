const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const multer = require('multer');

let storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+ "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage
}).single("image");

router.get("/", API.fetchAllDessert);
router.get("/:id", API.fetchDessertByID);
router.post("/", upload, API.createDessert);
router.patch("/:id", upload, API.updateDessert);
router.delete("/:id", API.deleteDessert);


module.exports = router;
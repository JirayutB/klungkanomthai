const Dessert = require("../models/desserts");
const fs = require("fs");

module.exports = class API {
    static async fetchAllDessert(req, res) {
        try {
            const desserts = await Dessert.find();
            res.status(200).json(desserts);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }

    static async fetchDessertByID(req, res) {
        const id = req.params.id;
        try {
            const dessert = await Dessert.findById(id);
            res.status(200).json(dessert);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }

    static async createDessert(req, res) {
        const dessert = req.body;
        const imagename = req.file.filename;
        dessert.image = imagename;
        try {
            await Dessert.create(dessert);
            res.status(201).json({ message: "Dessert created successfully"});
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async updateDessert(req, res) {
        const id = req.params.id;
        let new_image = '';
        if(req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/'+ req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        const newDessert = req.body;
        newDessert.image = new_image;

        try {
            await Dessert.findByIdAndUpdate(id, newDessert);
            res.status(200).json({ message: "Dessert updated successfully"});
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async deleteDessert(req, res) {
        const id = req.params.id;
        try {
            const result = await Dessert.findByIdAndDelete(id);
            if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads/'+result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ message: "Dessert deleted successfully"});
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}
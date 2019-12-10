const router = require("express").Router();
const knex = require("../data/dbConfig"); // rename to knex from db

// always returns promise. so async mmk?


router.get("/", async (req, res) => {
    try {
        const accounts = await knex.select('*').from('accounts');
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: "Error getting accounts." });
    }
});

router.post("/", async (req, res) => {
    if (!req.body) { res.status(400).json({ message: "Missing information" }); }
    try {
        const newId = await knex
            .insert(req.body, 'id')
            .into('accounts');
        res.status(200).json(newId);
    } catch (error) {
        res.status(500).json({ message: "Error adding new account." });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const accounts = await knex.select('*').from('accounts').where({ id: req.params.id });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: "Error getting accounts." });
    }
});

router.put("/:id", async (req, res) => {
    if (!req.body) { res.status(400).json({ message: "Missing information" }); }
    try {
        const count = await knex
            .where({ id: req.params.id })
            .update(req.body)
            .into('accounts');
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ message: "Error updating account." });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const count = await knex('accounts')
            .where({ id: req.params.id })
            .del();
        res.status(200).json({count, message: 'account deleted'});
    } catch (error) {
        res.status(500).json({ message: "Error updating account." });
    }
});

module.exports = router;
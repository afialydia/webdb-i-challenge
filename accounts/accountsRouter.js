const router = require("express").Router();
const knex = require("../data/dbConfig"); // rename to knex from db

// always returns promise. so async mmk?

router.get("/", (req, res) => {
	knex
		.select("*")
		.from("Customers").where("PostalCode")
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({ errorMessage: "error getting posts" });
		});
});

module.exports = router;

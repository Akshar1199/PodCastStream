const express = require('express');
const { createPodcastController, podcastByCategoryController, getPodcastByIdController, addViewController, mostPopularPodcastController } = require('../Controllers/podcastController');
const router = express.Router();

router.post("/create/:id", createPodcastController)

router.get("/category/:category", podcastByCategoryController)

router.get("/:id", getPodcastByIdController)

router.get("/get/mostpopular", mostPopularPodcastController)

router.put("/addview/:podid", addViewController)

module.exports = router;
const Episodes = require("../Models/EpisodesModel");
const Podcasts = require("../Models/PodcastModel");
const UserModel = require('../Models/UserModel');

const createPodcastController = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);

        // Extract episodes from the request body
        const episodes = req.body.episodes.map(episode => ({
            name: episode.name,
            desc: episode.desc,
            thumbnail: episode.thumbnail,
            type: episode.type,
            file: episode.file,
        }));

        // Create and save episodes
        const episodeList = await Promise.all(episodes.map(async item => {
            const episode = new Episodes({ creator: user.id, ...item });
            return await episode.save();
        }));

        // Create podcast object
        const podcast = new Podcasts({
            creator: user.id,
            episodes: episodeList.map(episode => episode._id),
            name: req.body.name,
            desc: req.body.desc,
            thumbnail: req.body.thumbnail,
            tags: req.body.tags,
            type: req.body.type,
            category: req.body.category
        });

        // Save the podcast
        const savedPodcast = await podcast.save();

        // Update user's podcasts array
        await UserModel.findByIdAndUpdate(user.id, {
            $push: { podcasts: savedPodcast._id },
        }, { new: true });

        res.status(201).json(savedPodcast);
    } catch (err) {
        next(err);
    }
};

const podcastByCategoryController = async (req, res) => {
    try {

        const podcasts = await Podcasts.find({ category: req.params.category })
            .populate("creator", "name image")
            .populate("episodes");



        if (podcasts.length === 0) {
            return res.status(404).json({ msg: 'No podcasts found for this category' });
        }
        res.json(podcasts);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const mostPopularPodcastController = async (req, res, next) => {
    try {
        const podcast = await Podcasts.find().sort({ views: -1 }).populate("creator", "name image").populate("episodes").limit(10);
        res.status(200).json(podcast);
    } catch (err) {
        next(err);
    }
};

const getPodcastByIdController = async (req, res, next) => {
    try {
        const podcast = await Podcasts.findById(req.params.id).populate("creator", "name image").populate("episodes");
        return res.status(200).json(podcast);
    } catch (err) {
        next(err);
    }
};

const addViewController = async (req, res, next) => {
    try {
        const updatedPodcast = await Podcasts.findByIdAndUpdate(req.params.podid, {
            $inc: { views: 1 },
        }, { new: true });

        if (!updatedPodcast) {
            return res.status(404).json({ error: 'Podcast not found' });
        }

        res.status(200).json("The view has been increased.");

    } catch (err) {
        next(err);
    }
};



module.exports = { createPodcastController, podcastByCategoryController, getPodcastByIdController, addViewController, mostPopularPodcastController };

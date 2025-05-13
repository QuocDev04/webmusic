import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';
import { StatusCodes } from 'http-status-codes';


const addSong = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name || !req.body.desc || !req.body.album) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, desc, album"
            });
        }

        // Validate files
        if (!req.files || !req.files.audio || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: "Missing required files: audio and image"
            });
        }

        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        // Validate file types
        if (!audioFile.mimetype.startsWith('audio/')) {
            return res.status(400).json({
                success: false,
                message: "Invalid audio file type"
            });
        }

        if (!imageFile.mimetype.startsWith('image/')) {
            return res.status(400).json({
                success: false,
                message: "Invalid image file type"
            });
        }

        // Upload to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: "video",
            folder: "spotify/audio"
        });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
            folder: "spotify/images"
        });

        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60).toString().padStart(2, '0')}`

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.status(201).json({
            success: true,
            message: "Song Added Successfully",
            data: song
        })
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({
            success: false,
            message: "Failed to add song",
            error: error.message
        })
    }
}

const listSong = async (req, res) => {
    try {
        const getAll = await songModel.find()
        res.json(getAll)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Song removed" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { addSong, listSong, removeSong }
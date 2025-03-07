const Art = require('../models/Art');


const createArt = async (req, res) => {
    try {
        const { title, description, image, price, category, countInStock,rating } = req.body;
        const artist = req.userId; 
        
        if (!artist) {
            return res.status(400).json({ message: "Artist not found" });
        }

        const art = new Art({
            title,
            description,
            image,
            price,
            category,
            countInStock,
            artist,
            rating:0
        });

        await art.save(); 

        res.status(200).json({ message: "New art created successfully", art });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
const createArts= async(req,res)=>{
    try {
        const artists = req.body;
        const artist = req.userId; 
        
        if (!artist) {
            return res.status(400).json({ message: "Artist not found" });
        }
        if (!artists) {
            return res.status(400).json({ message: "Artists not found" });
        }
        const artistsInsertPayload = artists.map((item) => {
            const { title, description, image, price, category, countInStock } = item;
            return {
                title,
                description,
                image,
                price,
                category,
                countInStock,
                artist,
                rating:0
            }
        })
        const insertedArtists = await Art.insertMany(artistsInsertPayload)
        res.status(200).json({ message: "New arts created successfully", insertedArtists });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteArt = async (req, res) => {
    try {
        const { art_id } = req.query; 
        if (!art_id) {
            return res.status(400).json({ message: "Art ID is required" });
        }

        const deletedArt = await Art.findByIdAndDelete(art_id);
        if (!deletedArt) {
            return res.status(404).json({ message: "Art not found" });
        }

        res.status(200).json({ message: "Art deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateStock = async (req, res) => {
    try {
        const { _id, boughtAmount } = req.body;
        if (!_id || boughtAmount === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const art = await Art.findById(_id);
        if (!art) {
            return res.status(404).json({ message: "Art not found" });
        }
        if (art.countInStock < boughtAmount) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

        art.countInStock -= boughtAmount;
        await art.save();

        res.status(200).json({ message: "Stock updated successfully", updatedStock: art.countInStock });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateArt = async (req, res) => {
    try {
        const { _id, title, description, image, price, category, countInStock } = req.body;

        if (!_id) {
            return res.status(400).json({ message: "Art ID is required" });
        }

        const updatedArt = await Art.findByIdAndUpdate(
            _id,
            { title, description, image, price, category, countInStock },
            { new: true } 
        );

        if (!updatedArt) {
            return res.status(404).json({ message: "Art not found" });
        }

        res.status(200).json({ message: "Art updated successfully", updatedArt });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const getAll = async (req, res) => {
    try {
        const arts = await Art.find({}); // Fetch all documents from Art collection

        if (arts.length > 0) {
            return res.status(200).json({ message: "Arts found", arts });
        } else {
            return res.status(200).json({ message: "No arts found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createArt, deleteArt, updateStock, updateArt, createArts,getAll };

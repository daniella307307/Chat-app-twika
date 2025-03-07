const Category = require('../models/Categories');

const getAll = async (req, res) => {
    try {
      const categories = await Category.find({}); // ✅ Add await
      if (categories.length > 0) {
        res.status(200).json({ categories });
      } else {
        res.json({ message: "No categories found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports={getAll};

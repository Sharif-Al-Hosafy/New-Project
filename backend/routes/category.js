const router = require("express").Router();
const Category = require("../models/Category");
const verify = require("../controllers/verifyToken");

//Add New Category
router.post("/", async (req, res, next) => {
  try {
    const { name, image } = req.body;
    const catAlreadyExist = await Category.findOne({ name: name });
    if (catAlreadyExist) throw new Error("Category Already Exists");

    const newCategory = new Category({
      name: name,
      image: image,
    });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    next(err);
  }
});

//Get All Categories
router.get("/", async (req, res, next) => {
  try {
    const Categories = await Category.find();
    if (Categories.length === 0)
      res.json({ message: "There Is No Categories Yet" });
    else res.json(Categories);
  } catch (err) {
    next(err);
  }
});

//update category
router.patch("/:id", async (req, res, next) => {
  try {
    const Mongoose = require("mongoose");
    const catId = Mongoose.Types.ObjectId(req.params.id);

    const updatedCategory = await Category.findByIdAndUpdate(catId, req.body);
    if (!updatedCategory) throw new Error("Category Not Found");

    res.json(updatedCategory);
  } catch (err) {
    next(err);
  }
});

//delete category with related subcategories and products
router.delete("/:id", async (req, res, next) => {
  try {
    const Mongoose = require("mongoose");
    const catId = Mongoose.Types.ObjectId(req.params.id);

    const deleteCategory = await Category.findByIdAndRemove(catId);
    if (!deleteCategory) throw new Error("Category Not Found");

    await deleteCategory.remove(); // calling remove hook to remove related documents

    res.json(deleteCategory);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const router = require("express").Router();
const productController = require("./product.controller");
const uploadImage = require("../../utils/image upload/uploadImg");

//Add New Product
router.post(
  "/",
  uploadImage.array("productImages", 6),
  productController.addNewProduct
);

//Get all products
router.get("/", productController.getAllProducts);

//Get all products in a specific category
router.get("/:category", productController.getCategoryProducts);

//Get all products in a specific category & subcategory
router.get("/:category/:subcategory", productController.getSubcategoryProducts);

//Get one product
router.get("/:id", productController.getOneProduct);

//Add New size in a Product
router.post("/:id", productController.addNewSize);

//Update sizes  in a product
router.put("/:id", productController.updateSizes);

//delete a product
router.delete("/:id", productController.deleteProduct);

// get a wishlist
router.get("/user/wishlist", productController.getWishlist);

// add to a wishlist
router.post("/user/add-to-wishlist/:id", productController.addToWishlist);

// remove from a wishlist
router.delete(
  "/user/remove-from-wishlist/:id",
  productController.removeFromWishlist
);

// add review
router.post("/review/add-review/:id", productController.addReview);

module.exports = router;

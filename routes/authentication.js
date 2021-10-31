const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  mongoose = require("mongoose"),
  User = require("../models/User"),
  Tailor = require("../models/Tailor"),
  {
    userLoginValidationSchema,
    userRegisterValidationSchema,
  } = require("../models/joiValidation");

router.post("/register", async (req, res, next) => {
  // Validating any user registration based on his username, email and password
  const { username, email, password, type } = req.body;
  const { error } = userRegisterValidationSchema({
    username: username,
    email: email,
    password: password,
  });
  if (error) return next(error.details[0]); // ===> error when username, email, password not meet with validation schema

  //hashing
  const PlainPassword = req.body.password,
    saltRounds = 10,
    salt = await bcrypt.genSalt(saltRounds),
    anyUserHashedPassword = await bcrypt.hash(PlainPassword, salt);

  //user type
  const userType = type.toLowerCase();
  if (userType == "tailor")
    return creatNewTailor(req, res, next, anyUserHashedPassword);
  else if (userType == "user")
    return creatNewUser(req, res, next, anyUserHashedPassword);
  else if (userType == "vendor") res.json({ message: "hi from vendor" });
  else return next();
});

router.post("/login", async (req, res, next) => {
  const { email, password, type } = req.body;
  const { error } = userLoginValidationSchema({
    email: email,
    password: password,
  });

  //user type
  const userType = type.toLowerCase();

  if (error) return next(error.details[0]); // ===> error when username, email, password not meet with validation schema

  if (userType == "tailor") return tailorLogIn(req, res, next);
  else if (userType == "user") return userLogIn(req, res, next);
  else if (userType == "vendor") return res.json({ message: "hi from vendor" });
  else return next();
});

// Helper functions
async function creatNewTailor(req, res, next, anyUserHashedPassword) {
  const { username, email, location } = req.body;
  try {
    const alreadyExist = await Tailor.findOne({ email: email }); // user already exists
    if (alreadyExist) throw new Error("This tailor already Exists");

    const newTailor = new Tailor({
      username: username,
      password: anyUserHashedPassword,
      email: email,
      location: location,
    });
    const savedTailor = await newTailor.save();
    res.json({ NewUser: savedTailor._id, username: username });
  } catch (err) {
    next(err);
  }
}

async function creatNewUser(req, res, next, anyUserHashedPassword) {
  const { username, email } = req.body;
  try {
    const alreadyExist = await User.findOne({ email: email });
    if (alreadyExist) throw new Error("This user already Exists");

    const newUser = new User({
      username: username,
      password: anyUserHashedPassword,
      email: email,
    });

    const savedUser = await newUser.save();
    res.json({ NewUser: savedUser._id, username: username });
  } catch (err) {
    next(err);
  }
}

async function tailorLogIn(req, res, next) {
  try {
    const foundTailor = await Tailor.findOne({ email: req.body.email });
    if (!foundTailor) throw new Error("tailor email notttt found");
    const validPass = await bcrypt.compare(
      req.body.password,
      foundTailor.password
    );
    if (!validPass) throw new Error("passowrd didn't match");
    createToken(res, foundTailor._id, foundTailor.username, req.body.type); // assign a token for each user
  } catch (err) {
    next(err);
  }
}

async function userLogIn(req, res, next) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (!foundUser) throw new Error("user email notttt found");
    const validPass = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validPass) throw new Error("passowrd didn't match");
    createToken(res, foundUser._id, foundUser.username, req.body.type); // assign a token for each user
  } catch (err) {
    next(err);
  }
}

function createToken(res, userId, username, type) {
  const token = jwt.sign(
    { _id: userId, username: username, type: type },
    process.env.Token_Secret
  );
  res.json({ token: token });
}

module.exports = router;

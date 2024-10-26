const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllUsersCollection = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("Users").find();
    // console.log(mongodb.getDb().db().Recipes); 
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve recipes.", error: error.message });
  }
};


const getEachUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const user = await mongodb.getDb().db().collection("Users").findOne({ _id: userId });
    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the recipe.", error: error.message });
  }
};


  const addnewUser = async (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      profilePictures: req.body.profilePictures,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    };

const response = await mongodb
    .getDb()
    .db()
    .collection("Users")
    .insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while adding a new User."
        );
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      profilePictures: req.body.profilePictures,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    };
  
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection('Users')
        .replaceOne({ _id: userId }, user);
      
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json("Failed to update the user.");
      }
    } catch (error) {
      res.status(500).json(error.message || "An error occurred while updating the user.");
    }
};
  
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
  
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection('Users')
        .deleteOne({ _id: userId });
  
      if (response.acknowledged && response.deletedCount > 0) {
        res.status(200).json({ message: "User deleted successfully." });
      } else {
        res.status(404).json("User not found or already deleted.");
      }
    } catch (error) {
      res.status(500).json(error.message || "An error occurred while deleting the user.");
    }
};
  

module.exports = {
    getAllUsersCollection,
    getEachUser, 
    addnewUser,
    updateUser,
    deleteUser
}
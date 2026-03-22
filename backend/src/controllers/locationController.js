import Location from "../models/locationModel.js";

// GET LOCATION
export const getLocation = async (req, res) => {
  try {
    const location = await Location.findOne().sort({ createdAt: -1 });
    res.json({
      success: true,
      location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CREATE LOCATION
export const createLocation = async (req, res) => {
  try {
    const { address, city, state, pincode, phone, email, mapLink, workingHours } = req.body;

    if (!address || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "Address, city, state aur pincode required hai"
      });
    }

    const location = await Location.create({
      address, city, state, pincode, phone, email, mapLink, workingHours
    });

    res.status(201).json({
      success: true,
      message: "Location created successfully",
      location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE LOCATION
export const updateLocation = async (req, res) => {
  try {
    const updates = { ...req.body };

    const location = await Location.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }

    res.json({
      success: true,
      message: "Location updated successfully",
      location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE LOCATION
export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }

    res.json({
      success: true,
      message: "Location deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
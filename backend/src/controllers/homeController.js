// import HomePage from '../models/HomePage.js';
import HomePage from "../models/homeModel.js";


// 👉 GET HOMEPAGE
export const getHomePage = async (req, res) => {
  try {

    const homePage = await HomePage.findOne().sort({ createdAt: -1 });

    res.json(homePage);

  } catch (error) {

    res.status(500).json({
      message: "Error in fetching homepage"
    });

  }
};



// 👉 CREATE HOMEPAGE
export const createHomePage = async (req, res) => {

  try {

    const { shopName, tagline, description, phone, email, whatsapp } = req.body;

    const logo = req.files?.logo
      ? req.files.logo[0].path
      : "";

    const banners = req.files?.banners
      ? req.files.banners.map(file => file.path)
      : [];

    const homePage = await HomePage.create({
      shopName,
      tagline,
      description,
      phone,
      email,
      whatsapp,
      logo,
      banners
    });

    res.status(201).json({
      success: true,
      message: "Homepage created successfully",
      homePage
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// 👉 UPDATE HOMEPAGE
export const updateHomePage = async (req, res) => {

  try {

    const updates = { ...req.body };

    if (req.files?.logo) {
      updates.logo = req.files.logo[0].path;
    }

    if (req.files?.banners) {
      updates.banners = req.files.banners.map(file => file.path);
    }

    const homePage = await HomePage.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!homePage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found"
      });
    }

    res.json({
      success: true,
      message: "Homepage updated successfully",
      homePage
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// 👉 DELETE HOMEPAGE
export const deleteHomePage = async (req, res) => {

  try {

    const homePage = await HomePage.findByIdAndDelete(req.params.id);

    if (!homePage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found"
      });
    }

    res.json({
      success: true,
      message: "Homepage deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
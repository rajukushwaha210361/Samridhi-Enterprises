// import { Contact } from "../models/contactModel.js";

// // GET ALL CONTACTS
// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       contacts
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // CREATE CONTACT
// export const createContact = async (req, res) => {
//   try {
//     const { name, phone, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email aur message required hai"
//       });
//     }

//     const contact = await Contact.create({ name, phone, email, message });

//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       contact
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // UPDATE CONTACT
// export const updateContact = async (req, res) => {
//   try {
//     const updates = { ...req.body };

//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       updates,
//       { new: true, runValidators: true }
//     );

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Contact updated successfully",
//       contact
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // DELETE CONTACT
// export const deleteContact = async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(req.params.id);

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Contact deleted successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
// import { Contact } from "../controllers/";
import { Contact } from "../models/contactModel.js";
import transporter from "../config/mail.js";
import HomeModel from "../models/homeModel.js";
// GET ALL CONTACTS
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CREATE CONTACT + EMAIL
export const createContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email aur message required hai"
      });
    }

    // DB mein save
    const contact = await Contact.create({ name, phone, email, message });

    // Aapko notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "Not provided"}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });
 const homeData = await HomeModel.findOne();
  const whatsapp = homeData?.whatsapp || "8127997400";
  const shopName=homeData?.shopName|| "Samridhi Enterprises - Manufacturing of MS Parts"
    // User ko auto reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Samridhi Enterprises!",
      html: `
        <h3>Hello ${name}!</h3>
        <p>Thank you for contacting <b>${shopName}</b>.</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p><b>Your Message:</b> ${message}</p>
        <br/>
        <p>For urgent queries, call us: <b>${whatsapp}</b></p>
        <p style="color: gray; font-size: 12px;">${shopName}</p>
      `
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error sending message"
    });
  }
};

// DELETE CONTACT
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.json({
      success: true,
      message: "Contact deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting contact"
    });
  }
};
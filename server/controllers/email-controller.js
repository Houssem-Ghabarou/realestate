const Email = require("../models/email");
const realEstateProp = require("../models/real-estate-prop");
const ValidateMessage = require("../validation/validateMessage");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const sendEmail = async (req, res) => {
  const { property, namesurname, phone, email, description } = req.body;
  const { errors, isValid } = ValidateMessage(req.body);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASS,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let template;
    let subject;
    let imagesData; // An array to hold the transformed image data
    if (property) {
      // Load property-related template
      const prop = await realEstateProp.findById(property);
      const reference = prop ? prop.reference : null;
      const images = prop ? prop.images : null;

      // Convert the images string to an array by splitting on commas
      const imagePaths = images ? images.split(",") : [];

      // Ensure that imagePaths is an array before using map
      imagesData = Array.isArray(imagePaths)
        ? imagePaths.map((imagePath) => ({
            url: `http://localhost:${
              process.env.PORT_SERVER
            }/${imagePath.trim()}`, // Replace YOUR_PORT with the port number your server is running on
            alt: "Image Alt Text", // Replace with appropriate alt text for the images
          }))
        : [];

      console.log(imagesData, "imagesssssssssssss");

      template = await ejs.renderFile(
        path.join(__dirname, "../views/emailTemplates/property.ejs"),
        {
          reference,
          namesurname,
          phone,
          email,
          description,
          images: imagesData,
        }
      );

      subject = "Nouvelle demande immobilière";
    } else {
      // Load contact form template
      template = await ejs.renderFile(
        path.join(__dirname, "../views/emailTemplates/contact.ejs"),
        { namesurname, phone, email, description }
      );

      subject = "Nouvelle demande de contact";
    }
    let message = {
      from: process.env.MAIL_USERNAME, // sender address
      to: process.env.MAIL_USERNAME, // list of receivers
      subject: subject, // Subject line
      html: template, // html body using the EJS template
    };

    const sent = await transporter.sendMail(message);

    if (sent) {
      const newemail = new Email({
        namesurname,
        phone,
        email,
        description,
        property: property ? property : null,
      });

      const emailsaved = await newemail.save();

      if (emailsaved) {
        return res.status(200).json({
          message: `Email envoyé, ${sent.messageId}`, // Email sent, message ID
          newemail,
        });
      } else {
        return res.status(500).json({
          error: "Échec de sauvegarde de l'email dans la base de données.",
        }); // Failed to save email in the database.
      }
    } else {
      return res.status(500).json({ error: "Échec d'envoi de l'email." }); // Failed to send email.
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Échec d'envoi du message." }); // Message sending failed.
  }
};

const getUnreadEmails = async (req, res) => {
  try {
    const unread = await Email.find({ status: "unread" });
    res.status(200).json(unread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get unread emails." });
  }
};
const getReadEmails = async (req, res) => {
  try {
    const unread = await Email.find({ status: "read" });
    res.status(200).json(unread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get read emails." });
  }
};

const getEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    return res.status(200).json({ emails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get emails" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { emailId } = req.body;
    const updateStatus = await Email.findByIdAndUpdate(emailId, {
      status: "read",
    });
    if (updateStatus) {
      res.status(200).json({ message: "Email vu" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to mark as read" });
  }
};

module.exports = {
  sendEmail,
  getEmails,
  markAsRead,
  getUnreadEmails,
  getReadEmails,
};

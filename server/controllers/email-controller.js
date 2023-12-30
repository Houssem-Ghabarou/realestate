const Email = require("../models/email");
const realEstateProp = require("../models/real-estate-prop");
const ValidateMessage = require("../validation/validateMessage");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // The redirect URL used during the auth process
);

oAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

const sendEmail = async (req, res) => {
  const { property, namesurname, phone, email, description } = req.body;
  const { errors, isValid } = ValidateMessage(req.body);

  try {
    let accessToken;

    accessToken = await oAuth2Client.getAccessToken();
    console.log(accessToken, "aceeees");
    const now = Date.now();
    if (accessToken.expiry_date < now + 30000) {
      // The token is about to expire in the next 30 seconds
      console.log("Access token is about to expire. Refreshing...");

      // Refresh the token using the refresh token
      const newTokens = await oAuth2Client.refreshToken(
        oAuth2Client.credentials.refresh_token
      );

      // Update the OAuth2 client with the new tokens
      oAuth2Client.setCredentials(newTokens);

      // Obtain the refreshed access token
      accessToken = await oAuth2Client.getAccessToken();
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken?.token, // assuming that the resolved accessToken object has a `token` property
      },
      // tls: {
      //   rejectUnauthorized: false, // Only use this for self-signed certificates
      // },
    });
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let template;
    let subject;
    let imagesData; // An array to hold the transformed image data
    let propertyLink;
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
            url: `${process.env.SERVER_URL}/${imagePath.trim()}`, // Replace YOUR_PORT with the port number your server is running on
            alt: "immobilier promovilla", // Replace with appropriate alt text for the images
          }))
        : [];
      const propIdName = prop?.propIdName;

      propertyLink = `${process.env.CLIENT_URL}/bien/details/${propIdName}`;

      template = await ejs.renderFile(
        path.join(__dirname, "../views/emailTemplates/property.ejs"),
        {
          reference,
          namesurname,
          phone,
          email,
          description,
          propertyLink,
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
    // console.error(error);
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

// const { createTransport } = require("nodemailer");
// const { generateInvitationLink } = require("../helpers/generateInvitationLink");
// const UserModel = require("../models/usersModel");

// const sendInvitation = async (req, res) => {
//   const user = await UserModel.findById(req.user.userId);
//   const { email } = req.body;
//   const invitationLink = generateInvitationLink(req.params.projectId, user._id);

//   const transporter = createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: {
//       user: process.env.ETHEREAL_EMAIL,
//       pass: process.env.ETHEREAL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: user.email,
//     to: email,
//     subject: "Project invitation",
//     text: `You have been invited to participate in the project. Use the following link to log in: ${invitationLink}`,
//   };

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       return res.status(403).send({
//         message: "Oops something went wrong",
//       });
//     } else {
//       console.log("Email sent:", info.response);
//       res.send("Email sent successfully");
//     }
//   });
// };

// module.exports = { sendInvitation };

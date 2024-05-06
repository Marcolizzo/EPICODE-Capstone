// const jwt = require("jsonwebtoken");

// const generateInvitationLink = (projectId, inviterId) => {
//   // Define the payload for the JWT token
//   const payload = {
//     projectId: projectId,
//     inviterId: inviterId,
//   };

//   // Generate the JWT token with a secret key
//   const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

//   // Create the invitation link
//   const invitationLink = `${process.env.BASE_URL}/login?token=${token}`;

//   return invitationLink;
// };

// module.exports = { generateInvitationLink };

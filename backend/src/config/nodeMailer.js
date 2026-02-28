import axios from "axios";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Arthavya",
          email: process.env.SENDER_EMAIL, // must be verified in Brevo
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Brevo API Error:", error.response?.data || error.message);
    throw new Error("Email sending failed");
  }
};
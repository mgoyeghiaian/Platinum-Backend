import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());
app.use(cors());

const mainmail = 'mgoyeghiaian@gmail.com';
const MainPass = 'rmkrobuqoreiaudm';

app.post('/send-email', async (req, res) => {
  try {
    const { name, email, phoneNumber, budget, comments } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mainmail,
        pass: MainPass
      }
    });

    const inquiryMailOptions = {
      from: email,
      to: mainmail,
      subject: 'New Inquiry',
      html: `
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber || 'Not provided'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not provided'}</p>
          <p><strong>Comments:</strong> ${comments || 'Not provided'}</p>
          <img src="http://platinumhldg.com/Logo/Logo1.png" alt="Platinum Logo" width="150" height="95" />
      `
    };


    const thankYouMailOptions = {
      from: mainmail,
      to: email,
      subject: 'Thank You for Contacting Us',
      html: `
        <p>Dear ${name || 'Customer'},</p>
        <p>We sincerely appreciate your inquiry and the opportunity to assist you. Thank you for considering Platinum Holdings for your needs.</p>
        <p>Your message has been received, and our team will review it promptly. Please be assured that we will respond to you as soon as possible with the information you require.</p>
        <p>Should you have any urgent matters, feel free to contact us directly using the following details:</p>
        <p>Email: info@platinumhldg.com</p>
        <p>Telephone: 961 5 950 460</p>
        <p>Cell: 961 78 850 805 / 961 71 109 209</p>
        <p>Our offices are located in Hazmieh, Martakla, Facing the Ministry of Works, Platinum Building 3rd Floor.</p>
    
        <img src="http://platinumhldg.com/Logo/Logo1.png" alt="Platinum Logo" width="150" height="95" />
      `
    };


    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});

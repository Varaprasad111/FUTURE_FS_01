 const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MySQL Connection Initialization via Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Prevents console cluttering
  }
);

// Define SQL Table Structure (Model)
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Test DB Connection & Sync Table Structure Automatically
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL Database connected successfully.');
    return sequelize.sync(); // Creates the table automatically if it doesn't exist
  })
  .then(() => console.log('📁 Database tables synchronized successfully.'))
  .catch(err => console.error('❌ MySQL Database connection error:', err));

// Email Transporter Config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // 1. Insert Record Directly into MySQL Table
    await Contact.create({ name, email, message });

    // 2. Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `💼 New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message saved and email sent!' });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
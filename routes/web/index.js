const express = require('express');
const contactFormModel = require('../../models/contactForm');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('Homepage');
})

// POST route to handle form submission
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate data
    if (!name || !email || !message) {
      return res.status(400).render('error', { message: 'All fields are required.' });
    }

    // Use `contactFormModel.create()` to save the data
    await contactFormModel.create({ name, email, message });
    // Render success page
    res.render('success', {
      message: 'Message received!',
      redirectUrl: '/' // Adjust if necessary
    });
  } catch (err) {
    console.error('Error adding contact form entry:', err);
    res.status(500).render('error', {
      message: 'Failed to add contact form entry. Please try again later.'
    });
  }
});


module.exports = router;
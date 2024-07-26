const express = require('express');
const contactFormModel = require('../../models/contactForm');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('Homepage');
})

router.post('/submit', (req, res) => {
  contactFormModel.create({ ...req.body }).then(data => {
    res.render('success', { message: 'Successfully added', redirectUrl: '/' });
  }).catch(err => {
    res.status(500).send('Failed to add');
  })
});

module.exports = router;
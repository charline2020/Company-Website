const express = require('express');
const contactFormModel = require('../../models/contactForm');
const router = express.Router();

const bodyParser = require('body-parser'); // Middleware
// Include Express Validator Functions
const { check, validationResult } = require('express-validator');
router.use(bodyParser.urlencoded({ extended: false }));

// Validation Array
var inputValidate = [
  // Check email
  check('name').trim().isLength({ min: 2, max: 10 }).isString()
  .withMessage('Name must be between 2 and 10 characters long.')
  .matches(/^[A-Za-z\s]+$/).withMessage('Name can only contain letters and spaces.'),

  check('email','Must Be an Email Address').isEmail()
  .trim().escape().normalizeEmail(),

  check('message').trim().isLength({ min: 5, max: 200 }).matches(/^[A-Za-z\s]+$/).isString()
  .withMessage('Message must be between 5 and 200 characters long.')
  .escape()
  ];

router.get('/', (req, res) => {
  res.render('Homepage');
})

// POST route to handle form submission
router.post('/submit', inputValidate, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    // Use `contactFormModel.create()` to save the data
    await contactFormModel.create({ name, email, message });
    res.json({
        code: '0000', //status 200 * 100 or 0000 or 000000
        msg: 'Successfully create',
        name: name,
        email: email,
        message: message
    }
    );
  } catch (err) {
    res.json({
        code: '1002',
        msg: 'Failed to add contact form entry. Please try again later.',
        name: null,
        email: null,
        message: null
    });
  }
});


module.exports = router;
// /routes/planRoutes.js
const express = require('express');
const router = express.Router();
const { generateTripBlueprint } = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');

const { check } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');

router.post(
    '/generate',
    protect,
    [
        check('origin', 'Origin city is required').not().isEmpty(),
        check('destinationName', 'Destination city is required').not().isEmpty(),
        check('departureDate', 'Valid departure date is required').isISO8601(),
        check('duration', 'Duration must be at least 1 day').isInt({ min: 1 }),
        check('travelers', 'Travelers must be at least 1').isInt({ min: 1 }),
    ],
    validate,
    generateTripBlueprint
);

module.exports = router;
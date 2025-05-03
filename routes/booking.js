const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    console.log('All bookings:', bookings); // Log the bookings
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const { productName, quantity, addOns, basePrice } = req.body;

  // Calculate total price
  const addOnsTotal = addOns.reduce((sum, addOn) => sum + addOn.price, 0);
  const totalPrice = (basePrice + addOnsTotal) * quantity;

  const booking = new Booking({
    productName,
    quantity,
    addOns,
    basePrice,
    totalPrice
  });

  try {
    const newBooking = await booking.save();
    console.log('New booking saved:', newBooking); // Log the saved booking
    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 
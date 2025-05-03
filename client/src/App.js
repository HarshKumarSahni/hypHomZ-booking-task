import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
  Box,
} from '@mui/material';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    productName: 'Premium Product',
    quantity: 1,
    basePrice: 100,
    addOns: [],
  });
  const [bookings, setBookings] = useState([]);

  const availableAddOns = [
    { name: 'Extended Warranty', price: 20 },
    { name: 'Priority Support', price: 15 },
    { name: 'Installation Service', price: 30 },
  ];

  const handleQuantityChange = (e) => {
    setFormData({ ...formData, quantity: parseInt(e.target.value) });
  };

  const handleAddOnChange = (addOn) => {
    const isChecked = formData.addOns.some((item) => item.name === addOn.name);
    if (isChecked) {
      setFormData({
        ...formData,
        addOns: formData.addOns.filter((item) => item.name !== addOn.name),
      });
    } else {
      setFormData({
        ...formData,
        addOns: [...formData.addOns, addOn],
      });
    }
  };

  const calculateTotal = () => {
    const addOnsTotal = formData.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return (formData.basePrice + addOnsTotal) * formData.quantity;
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        totalPrice: calculateTotal(),
      });
      alert('Booking successful!');
      fetchBookings();
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert(`Error saving booking: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Booking
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {formData.productName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Base Price: ${formData.basePrice}
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Quantity</InputLabel>
            <Select
              value={formData.quantity}
              onChange={handleQuantityChange}
              label="Quantity"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            Add-ons
          </Typography>
          {availableAddOns.map((addOn) => (
            <FormControlLabel
              key={addOn.name}
              control={
                <Checkbox
                  checked={formData.addOns.some((item) => item.name === addOn.name)}
                  onChange={() => handleAddOnChange(addOn)}
                />
              }
              label={`${addOn.name} ($${addOn.price})`}
            />
          ))}

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Total Price: ${calculateTotal()}
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Book Now
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Bookings
        </Typography>
        {bookings.map((booking) => (
          <Paper key={booking._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">{booking.productName}</Typography>
            <Typography>Quantity: {booking.quantity}</Typography>
            <Typography>Base Price: ${booking.basePrice}</Typography>
            {booking.addOns.length > 0 && (
              <Typography>
                Add-ons: {booking.addOns.map(addOn => `${addOn.name} ($${addOn.price})`).join(', ')}
              </Typography>
            )}
            <Typography variant="h6" color="primary">
              Total Price: ${booking.totalPrice}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Booked on: {new Date(booking.createdAt).toLocaleString()}
            </Typography>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
};

export default App; 
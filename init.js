const express = require('express');
const router = express.Router();
const axios = require('axios');
const { User, Event } = require('../models');

router.post('/init', async (req, res) => {
  const count = await Event.count();
  if (count > 0) return res.status(400).json({ error: 'Database already initialized' });

  const { data } = await axios.get('http://backend.restapi.co.za/items/events');
  for (const event of data) {
    let organizer = await User.findOne({ where: { email: event.organizerEmail } });
    if (!organizer) {
      organizer = await User.create({
        firstname: event.organizerFirstName,
        lastname: event.organizerLastName,
        email: event.organizerEmail,
        username: event.organizerEmail.split('@')[0],
        password: 'P@sswOrd',
        role: 'organizer',
      });
    }
    await Event.create({ ...event, organizerId: organizer.id, inviteKey: crypto.randomBytes(4).toString('hex') });
  }

  await User.create({
    firstname: 'Admin', lastname: 'User', email: 'admin@vem.com', username: 'admin',
    password: 'Admin123!', role: 'admin',
  });

  res.json({ message: 'Database initialized' });
});

module.exports = router;
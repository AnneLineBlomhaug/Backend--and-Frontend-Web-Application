const express = require('express');
const router = express.Router();
const { Attendee, Event } = require('../models');

router.post('/register', async (req, res) => {
  const { invitationkey, email, name, surname } = req.body;
  if (!invitationkey || !email || !name || !surname) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const event = await Event.findOne({ where: { inviteKey: invitationkey } });
  if (!event) return res.status(400).json({ error: 'Invalid invitation key' });
  if (new Date(event.date) < new Date()) {
    return res.status(400).json({ error: 'Event has already started' });
  }

  const attendeeCount = await Attendee.count({ where: { eventId: event.id } });
  if (attendeeCount >= event.capacity) {
    return res.status(400).json({ error: 'Event capacity reached' });
  }

  const existingAttendee = await Attendee.findOne({ where: { email, eventId: event.id } });
  if (existingAttendee) return res.status(400).json({ error: 'Attendee already registered for this event' });

  const attendee = await Attendee.create({ email, name, surname, eventId: event.id });
  res.json(attendee);
});

module.exports = router;
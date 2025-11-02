const express = require('express');
const router = express.Router();
const { Event, User } = require('../models');
const auth = require('../middleware/auth');
const crypto = require('crypto');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

router.get('/', auth(['organizer', 'admin']), async (req, res) => {
  const events = req.user.role === 'admin' 
    ? await Event.findAll() 
    : await Event.findAll({ where: { organizerId: req.user.id } });
  res.json(events);
});

router.post('/search', async (req, res) => {
    const { title, description, eventType } = req.body;
    let query = 'SELECT * FROM Events WHERE 1=1';
    const replacements = {};
  
    if (title) {
      query += ' AND title LIKE :title';
      replacements.title = `%${title}%`;
    }
    if (description) {
      query += ' AND description LIKE :description';
      replacements.description = `%${description}%`;
    }
    if (eventType) {
      query += ' AND eventTypeId = :eventType';
      replacements.eventType = eventType;
    }
  
    try {
      const events = await sequelize.query(query, {
        replacements,
        type: Sequelize.QueryTypes.SELECT,
        model: Event,
      });
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.post('/', auth(['organizer']), async (req, res) => {
  const { title, description, date, capacity } = req.body;
  if (!title || !date || !capacity) return res.status(400).json({ error: 'Missing required fields' });
  const inviteKey = crypto.randomBytes(4).toString('hex');
  const event = await Event.create({ ...req.body, inviteKey, organizerId: req.user.id });
  res.json(event);
});

module.exports = router;

router.get('/stats', auth(['organizer', 'admin']), async (req, res) => {
    let query = `
      SELECT e.title, COUNT(a.id) as attendeeCount
      FROM Events e
      LEFT JOIN Attendees a ON e.id = a.eventId
    `;
    if (req.user.role === 'organizer') {
      query += ' WHERE e.organizerId = :organizerId';
    }
    query += ' GROUP BY e.id, e.title';
  
    try {
      const stats = await sequelize.query(query, {
        replacements: { organizerId: req.user.id },
        type: Sequelize.QueryTypes.SELECT,
      });
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.put('/:id', auth(['organizer', 'admin']), async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (req.user.role !== 'admin' && event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await event.update(req.body);
    res.json(event);
  });
  
  router.delete('/:id', auth(['organizer', 'admin']), async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (req.user.role !== 'admin' && event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const attendees = await Attendee.count({ where: { eventId: event.id } });
    const hasSpeaker = !!event.speakerId;
    if (attendees > 0 || hasSpeaker) {
      return res.status(400).json({ error: 'Cannot delete event with attendees or speaker' });
    }
    await event.destroy();
    res.json({ message: 'Event deleted' });
  });
  
  module.exports = router;
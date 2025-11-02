const express = require('express');
const router = express.Router();
const { Speaker, Event } = require('../models');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const speakers = await Speaker.findAll();
  res.json(speakers);
});

router.put('/:id', auth(['admin']), async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id);
  if (!speaker) return res.status(404).json({ error: 'Speaker not found' });
  
  const { eventId } = req.body;
  if (eventId) {
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.speakerId) return res.status(400).json({ error: 'Event already has a speaker' });
    
    const conflictingEvent = await Event.findOne({
      where: { speakerId: speaker.id, date: event.date },
      whereNot: { id: eventId },
    });
    if (conflictingEvent) return res.status(400).json({ error: 'Speaker already assigned to another event at the same time' });
    
    event.speakerId = speaker.id;
    await event.save();
  }
  await speaker.update(req.body);
  res.json(speaker);
});

router.post('/', auth(['admin']), async (req, res) => {
  const speaker = await Speaker.create(req.body);
  res.json(speaker);
});

router.delete('/:id', auth(['admin']), async (req, res) => {
  const speaker = await Speaker.findByPk(req.params.id);
  if (!speaker) return res.status(404).json({ error: 'Speaker not found' });
  const assigned = await Event.count({ where: { speakerId: speaker.id } });
  if (assigned > 0) return res.status(400).json({ error: 'Cannot delete assigned speaker' });
  await speaker.destroy();
  res.json({ message: 'Speaker deleted' });
});

module.exports = router;
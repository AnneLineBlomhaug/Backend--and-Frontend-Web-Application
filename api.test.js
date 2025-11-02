const request = require('supertest');
const app = require('../app');
const { Event, Attendee } = require('../models');

describe('API Tests', () => {
  it('registers a new attendee', async () => {
    const event = await Event.create({ title: 'Test Event', date: new Date(), capacity: 10, inviteKey: 'abc12345' });
    const res = await request(app)
      .post('/api/attendees/register')
      .send({ invitationkey: 'abc12345', email: 'test@example.com', name: 'Test', surname: 'User' });
    expect(res.status).toBe(200);
  });
});
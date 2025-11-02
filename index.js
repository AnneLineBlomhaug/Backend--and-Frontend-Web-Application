const User = require('./User');
const Event = require('./Event');
const Speaker = require('./Speaker');
const Attendee = require('./Attendee');

User.hasMany(Event, { foreignKey: 'organizerId' });
Event.belongsTo(User, { foreignKey: 'organizerId' });
Event.belongsTo(Speaker, { foreignKey: 'speakerId' });
Event.hasMany(Attendee, { foreignKey: 'eventId' });
Attendee.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = { User, Event, Speaker, Attendee };
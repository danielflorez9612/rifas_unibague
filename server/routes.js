const participantController = require('./controllers').participants;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Participants API!',
    }));

    app.get('/api/participants', participantController.list);
    app.post('/api/participants', participantController.create);
};
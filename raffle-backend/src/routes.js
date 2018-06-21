const participantController = require('./controllers/index').participants;

module.exports = (app) => {
    app.post('/api/config', participantController.configPadding);
    app.get('/api/participants', participantController.list);
    app.post('/api/participants', participantController.create);
    app.post('/api/winner', participantController.registerWinner);
    app.get('/api/availableNumbers', participantController.listAvailableNumbers);
};
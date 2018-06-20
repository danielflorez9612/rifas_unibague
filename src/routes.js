const participantController = require('./controllers').participants;
const viewsController = require('./controllers').views;

module.exports = (app) => {
    app.get('/*', viewsController.index);
    app.post('/api/config', participantController.configPadding);
    app.get('/api/participants', participantController.list);
    app.post('/api/participants', participantController.create);
    app.post('/api/winner', participantController.registerWinner);
    app.get('/api/availableNumbers', participantController.listAvailableNumbers);
};
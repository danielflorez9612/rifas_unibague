const participantController = require('./controllers').participants;

module.exports = (app) => {
    app.get('/*', (req, res) => res.render('index', {
        name:'Daniel'
    }));
    app.post('/api/config', participantController.configPadding);
    app.get('/api/participants', participantController.list);
    app.post('/api/participants', participantController.create);
    app.post('/api/winner', participantController.registerWinner);
    app.get('/api/availableNumbers', participantController.listAvailableNumbers);
};
const Participants = require('../models').Participants;

module.exports = {
    create(req, res) {
        return Participants
            .create({
                document: req.body.document,
                generatedNumber: req.body.generatedNumber,
            })
            .then(participant => res.status(201).send(participant))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Participants
            .all()
            .then(participants => res.status(200).send(participants))
            .catch(error => res.status(400).send(error));
    }
};
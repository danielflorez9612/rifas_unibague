const Participants = require('../models/index').Participants;
let digitNumber = 3;
Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};
module.exports = {
    create(req, res) {
        if(req.body.generatedNumber>=Math.pow(10, digitNumber)) {
            return res.status(400).send({'generatedNumber':'Invalid generated number'});
        }
        return Participants
            .create({
                document: req.body.document,
                generatedNumber: Number(req.body.generatedNumber).pad(digitNumber),
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone
            })
            .then(participant => res.status(201).send(participant))
            .catch(error => res.status(400).send({[error.errors[0].path]:error.errors[0].message}));
    },
    list(req, res) {
        return Participants
            .all()
            .then(participants => res.status(200).send(participants))
            .catch(error => res.status(400).send(error));
    },
    listAvailableNumbers(req, res) {
        return Participants
            .all()
            .then(participants => {
                let numbers = [...Array(Math.pow(10, digitNumber)).keys()];
                participants.forEach(participant => {
                    const alreadyOwnedNumber = Number(participant.generatedNumber);
                    const indexOfAlreadyOwnedNumber = numbers.findIndex(value => value===alreadyOwnedNumber);
                    numbers.splice(indexOfAlreadyOwnedNumber, 1);
                });
                return res.status(200).send(numbers.map(value => value.pad(digitNumber)));
            })
            .catch(error => res.status(400).send(error));
    },
    configPadding(req, res) {
        const padding = Number(req.body.padding);
        if(!padding || padding<1) {
            return res.status(400).send({error:"Invalid digit number"});
        } else {
            digitNumber = padding;
            Participants.destroy({where: {}}).then(() => {});
            return res.status(200).send({message:"Reseted succesfully"});
        }
    },
    registerWinner(req, res) {
        const winnerNumber = Number(req.body.winner);
        if(!winnerNumber || winnerNumber <0 || winnerNumber>=Math.pow(10, digitNumber)) {
            return res.status(400).send({error:"Invalid winner number"});
        }else {
            return Participants
                .find({
                    where: { generatedNumber: (winnerNumber).pad(digitNumber) }
                })
                .then(winnerParticipant=> res.status(200).send({ winner:winnerParticipant }))
                .catch(error => res.status(400).send(error));
        }
    }
};
const PepipostSDK = require('pepipost-sdk-nodejs');
const Email = PepipostSDK.EmailController;
module.exports = {
    notify(participant) {
        const data = {
            'api_key': '8329f2fe798424e5bff3fd6a65f1e0dc',
            'email_details': {
                'fromname':'Asociación de Graduados Unibagué',
                'subject':'Registro exitoso en el sorteo',
                'from':'info@unibague.edu.co',
                'content':JSON.stringify(participant)
            },
            'recipients': [
                participant.email
            ]
        };
        Email.send(data, (err_ms, parsed, context)=>{
            console.log('err',err_ms);
            console.log('parsed',parsed);
            console.log('context',context);
        });
    }
};
class RegisterParticipantForm {
    onInit() {
        this.template = 'index';
        this.state = {name: 'Luis b'}
    }
}

const view = new RegisterParticipantForm();
view.onInit();
module.exports = {
    index : (req, res) => res.render(view.template,view.state),
};
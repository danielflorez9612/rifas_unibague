
import React, { Component } from 'react';
import ParticipantForm from './ParticipantForm';
import Confirmation from './Confirmation';

class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            formSubmitted: false
        }
    }
    render() {
        if(!this.state.formSubmitted) {
            return <ParticipantForm onSubmit={response => this.setState({formSubmitted:true, participant: response.data})}/>;
        } else {
            return <Confirmation participant={this.state.participant}/>;
        }
    }
}
export default AppBody;
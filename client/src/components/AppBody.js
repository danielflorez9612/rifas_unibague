
import React, { Component } from 'react';
import ParticipantForm from './ParticipantForm';

class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            formSubmitted: false
        }
    }
    render() {
        if(this.state.formSubmitted) {
            return <div>
                {JSON.stringify(this.props)}
            </div>
        } else {
            return <ParticipantForm />
        }
    }
}
export default AppBody;
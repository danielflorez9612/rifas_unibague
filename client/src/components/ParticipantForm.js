import React, { Component } from 'react';
import {Forms, Validators, ValidatorUtils} from '../formValidation/validators';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Card from '@material-ui/core/es/Card/Card';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import CardActions from '@material-ui/core/es/CardActions/CardActions';
import Button from '@material-ui/core/es/Button/Button';
import TextField from '@material-ui/core/es/TextField/TextField';
import CardMedia from '@material-ui/core/es/CardMedia/CardMedia';
import axios from 'axios'
import Typography from '@material-ui/core/es/Typography/Typography';

const styles = {
    root: {
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
        maxWidth: 1200,
        marginTop:20,
        marginBottom:20,
        margin: '0 auto'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    pos: {
        marginBottom: 12,
    },
};
class ParticipantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                isComplete:false,
                hasErrors: false,
                controls: {
                    document: {
                        value:'',
                        validators:[Validators.required]
                    },
                    fullName: {
                        value:'',
                        validators:[Validators.required]
                    },
                    generatedNumber: {
                        value:'',
                        validators:[Validators.required]
                    },
                    email:{
                        value:'',
                        validators:[Validators.required, Validators.email]
                    },
                    phone:{
                        value:'',
                        validators:[Validators.required]
                    }

                }
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const {form} = this.state;
        form.controls[target.name].value = target.value;
        ValidatorUtils.runValidationsOn(form,target);
        Forms.verifyCompletion(form);
        this.setState({ form });
    }
    handleError({response}) {
        const {data} = response;
        const {form} =this.state;
        const keysWithErrors = Object.keys(data);
        keysWithErrors.forEach(key => {
            if(form.controls.hasOwnProperty(key)) {
                form.controls[key].errors = [data[key]];
            }
        });
        this.setState({form});
        ValidatorUtils.updateErrors(form);
    }
    handleSubmit() {
        const json = Forms.getValue(this.state.form);
        axios.post('/api/participants',json)
            .then(res => this.props.onSubmit(res))
            .catch(error => this.handleError(error));
    }
    render() {
        const { classes } = this.props;
        const { form } = this.state;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2" color="primary">
                        ¡Registrate para ganar una fabulosa Tablet!
                    </Typography>
                    <form>
                        <TextField
                            id="document"
                            label="Número de documento"
                            name="document"
                            value={form.controls['document'].value}
                            onChange={this.handleInputChange}
                            margin="normal"
                            fullWidth={true}
                            error ={form.controls['document'].errors && form.controls['document'].errors.length>0}
                            helperText={form.controls['document'].errors?form.controls['document'].errors[0]:''}
                        />
                        <br/>
                        <TextField
                            id="fullName"
                            label="Nombre completo"
                            name="fullName"
                            value={form.controls['fullName'].value}
                            onChange={this.handleInputChange}
                            margin="normal"
                            fullWidth={true}
                            error ={form.controls['fullName'].errors && form.controls['fullName'].errors.length>0}
                            helperText={form.controls['fullName'].errors?form.controls['fullName'].errors[0]:''}
                        />
                        <br/>
                        <TextField
                            id="phone"
                            label="Numero de teléfono de contacto (Para llamarte si te la ganas)"
                            name="phone"
                            value={form.controls['phone'].value}
                            onChange={this.handleInputChange}
                            margin="normal"
                            fullWidth={true}
                            error ={form.controls['phone'].errors && form.controls['phone'].errors.length>0}
                            helperText={form.controls['phone'].errors?form.controls['phone'].errors[0]:''}
                        />
                        <br/>
                        <TextField
                            id="email"
                            label="Email (Te notificaremos de los resultados, prometemos no enviarte spam)"
                            name="email"
                            value={form.controls['email'].value}
                            onChange={this.handleInputChange}
                            margin="normal"
                            fullWidth={true}
                            error ={form.controls['email'].errors && form.controls['email'].errors.length>0}
                            helperText={form.controls['email'].errors?form.controls['email'].errors[0]:''}
                        />
                        <br/>
                        <TextField
                            id="generatedNumber"
                            label="Number"
                            name="generatedNumber"
                            value={form.controls['generatedNumber'].value}
                            onChange={this.handleInputChange}
                            margin="normal"
                            fullWidth={true}
                            error ={form.controls['generatedNumber'].errors && form.controls['generatedNumber'].errors.length>0}
                            helperText={form.controls['generatedNumber'].errors?form.controls['generatedNumber'].errors[0]:''}
                        />
                    </form>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button variant="contained"
                            color="primary"
                            disabled={form.hasErrors || !form.isComplete}
                            fullWidth={true}
                            onClick={this.handleSubmit}>
                        Guardar
                    </Button>
                </CardActions>
            </Card>);
    }
}
export default withStyles(styles)(ParticipantForm);
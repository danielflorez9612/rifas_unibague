import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import AppBar from '@material-ui/core/es/AppBar/AppBar';
import Toolbar from '@material-ui/core/es/Toolbar/Toolbar';
import Typography from '@material-ui/core/es/Typography/Typography';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Card from '@material-ui/core/es/Card/Card';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import CardActions from '@material-ui/core/es/CardActions/CardActions';
import Button from '@material-ui/core/es/Button/Button';
import TextField from '@material-ui/core/es/TextField/TextField';
import CardMedia from '@material-ui/core/es/CardMedia/CardMedia';
import createMuiTheme from '@material-ui/core/es/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import {Validators, ValidatorUtils} from './validators';
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#446289',
            main: '#12385c',
            dark: '#001232',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffff8d',
            main: '#eacf5c',
            dark: '#b59e2b',
            contrastText: '#000000',
        },
    },
});
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
class App extends Component {
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
                        numeric:true,
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
        const form = this.state.form;
        form.controls[target.name].value = target.value;
        ValidatorUtils.runValidationsOn(form,target);
        ValidatorUtils.verifyCompletion(form);
        this.setState({ form });
    }
    static getValuesOf({controls}) {
        const newObject = {};
        const controlKeys = Object.keys(controls);
        for(const controlKey of controlKeys) {
            if(controls[controlKey].numeric) {
                newObject[controlKey]  = Number(controls[controlKey].value);
            } else {
                newObject[controlKey]  = controls[controlKey].value;
            }
        }
        return newObject;
    }
    handleSubmit() {
        const json = App.getValuesOf(this.state.form);
        axios.post('/api/participants',json)
            .then(res => console.log('ok',res.data))
            .catch(error => console.log('error',error));
    }

  render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme} >
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Rifa Asograduados
                        </Typography>
                    </Toolbar>
                </AppBar>
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
                                value={this.state.document}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth={true}
                                error ={this.state.form.controls['document'].errors && this.state.form.controls['document'].errors.length>0}
                                helperText={this.state.form.controls['document'].errors?this.state.form.controls['document'].errors[0]:''}
                            />
                            <br/>
                            <TextField
                                id="fullName"
                                label="Nombre completo"
                                name="fullName"
                                value={this.state.fullName}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth={true}
                                error ={this.state.form.controls['fullName'].errors && this.state.form.controls['fullName'].errors.length>0}
                                helperText={this.state.form.controls['fullName'].errors?this.state.form.controls['fullName'].errors[0]:''}
                            />
                            <br/>
                            <TextField
                                id="phone"
                                label="Numero de teléfono de contacto (Para llamarte si te la ganas)"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth={true}
                                error ={this.state.form.controls['phone'].errors && this.state.form.controls['phone'].errors.length>0}
                                helperText={this.state.form.controls['phone'].errors?this.state.form.controls['phone'].errors[0]:''}
                            />
                            <br/>
                            <TextField
                                id="email"
                                label="Email (Te notificaremos de los resultados, prometemos no enviarte spam)"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth={true}
                                error ={this.state.form.controls['email'].errors && this.state.form.controls['email'].errors.length>0}
                                helperText={this.state.form.controls['email'].errors?this.state.form.controls['email'].errors[0]:''}
                            />
                            <br/>
                            <TextField
                                id="generatedNumber"
                                label="Number"
                                name="generatedNumber"
                                value={this.state.generatedNumber}
                                onChange={this.handleInputChange}
                                margin="normal"
                                fullWidth={true}
                                error ={this.state.form.controls['generatedNumber'].errors && this.state.form.controls['generatedNumber'].errors.length>0}
                                helperText={this.state.form.controls['generatedNumber'].errors?this.state.form.controls['generatedNumber'].errors[0]:''}
                            />
                        </form>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button variant="contained"
                                color="primary"
                                disabled={this.state.form.hasErrors || !this.state.form.isComplete}
                                fullWidth={true}
                                onClick={this.handleSubmit}>
                            Guardar
                        </Button>
                    </CardActions>
                </Card>
                {/*<pre>{JSON.stringify(this.state.form)}</pre>*/}
          </MuiThemeProvider>
        );
  }
}

export default withStyles(styles)(App);

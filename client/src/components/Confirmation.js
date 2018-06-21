
import React, { Component } from 'react';
import Card from '@material-ui/core/es/Card/Card';
import CardHeader from '@material-ui/core/es/CardHeader/CardHeader';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/es/CardMedia/CardMedia';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Typography from '@material-ui/core/es/Typography/Typography';
import withStyles from '@material-ui/core/es/styles/withStyles';
import red from '@material-ui/core/es/colors/red';

const styles = {
    card: {
        minWidth: 275,
        maxWidth: 400,
        marginTop:20,
        marginBottom:20,
        margin: '0 auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
};
class Confirmation extends Component {
    render() {
        const { classes, participant} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        title={`¡Perfecto ${participant.fullName}! Fuiste registrado con el número ${participant.generatedNumber}`}
                        subheader={participant.createdAt}
                    />
                    <CardMedia
                        className={classes.media}
                        image="https://material-ui.com/static/images/cards/paella.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2" color="primary">
                            ¡Te deseamos mucha suerte!
                        </Typography>
                        <Typography component="p">
                            Te enviamos un mensaje al correo <b>{participant.email}</b> con la confirmación de tu número y fecha de sorteo.
                        </Typography>
                        <br/>
                        <Typography component="p">
                            Si llegas a ganar te enviaremos otro correo con las instrucciones para reclamar tu fabulosa tablet!
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
Confirmation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmation);
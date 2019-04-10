import React, {Ref} from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import AccountBox from '@material-ui/icons/AccountBox';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles =  createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

export interface Props extends WithStyles<typeof styles> {}

export interface State {
    user: string,
    auth: boolean;
}

class navBar extends React.Component<Props, State> {
    state: State = {
        auth: true,
        user: "Павел",
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ auth: event.target.checked, user: 'Алексей' });
    };

    render() {
        const { classes } = this.props;
        const { auth, user } = this.state;

        return (
            <div className={classes.root}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <AppBar position="static" color={"primary"}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" color="inherit" className={classes.grow}>

                        </Typography>

                        <IconButton color="inherit">
                            <Typography variant="h6" color="inherit" style={{marginRight:'5px'}}>
                                {auth ? user : 'Вход'}
                            </Typography>
                            {auth ? <AccountCircle /> : <AccountBox />}
                        </IconButton>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export const NavBar = withStyles(styles)(navBar);
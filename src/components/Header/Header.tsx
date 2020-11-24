import React, {useState} from 'react';
import '../../styles/App.css';
import AddButton from "./AddButton/AddButton";
import Grid from '@material-ui/core/Grid';

const Header = (props: {observeStorage: () => void}) => {
    const [isOpen, toggleIsOpen] = useState(false);
    return (
        <header className="header">
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <h1>TODO list</h1>
                </Grid>
                <Grid item>
                    <AddButton isOpen={isOpen}
                               observeStorage={props.observeStorage}
                               toggleIsOpen={toggleIsOpen}/>
                </Grid>
            </Grid>
        </header>
    )
};

export default Header;
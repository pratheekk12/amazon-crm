import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple, grey } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const PurpleSwitch = withStyles({
    switchBase: {
        color: purple[300],
        '&$checked': {
            color: purple[500],
        },
        '&$checked + $track': {
            backgroundColor: purple[500],
        },
    },
    checked: {},
    track: {},
})(Switch);


const GreySwitch = withStyles({
    switchBase: {
        color: grey[300],
        '&$checked': {
            color: grey[500],
        },
        '&$checked + $track': {
            backgroundColor: grey[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

export default function CustomizedSwitches(props) {
    var breakStatus = true;
    var agentStatus = false

    const handle = () => {
        if (localStorage.getItem('Break_Status') === 'OUT') {
            breakStatus = true;
        }
        if (localStorage.getItem('Break_Status') === 'IN') {
            breakStatus = false;
        }
        var agentStatus = true;
        if (localStorage.getItem('AgentType') === 'Inbound') {
            agentStatus = false;
        }
        if (localStorage.getItem('AgentType') === 'Outbound') {
            agentStatus = true;
        }

    }


    const [state, setState] = React.useState({
        checkedA: agentStatus,
        checkedB: breakStatus,
        checkedC: false,
    });

    useEffect(() => {
        handle()

    }, [props])

    // console.log("props", props)

    const handleChange = (event) => {
        console.log('handleChange', event.target.name)
        console.log('handleChange', event.target.checked)
        setState({ ...state, [event.target.name]: event.target.checked });
        if (event.target.name === 'checkedB') {
            // props.breakService('test')
            
            if (event.target.checked) {
              
                props.removeFromQueue()
                console.log("break in")
               
                localStorage.setItem('AgentType', 'Outbound')
                // setState({ ...state, ['checkedB']: true });
            } else {
                localStorage.setItem('AgentType', 'Inbound')
                props.addToQueue();
            }


        }
        // if (event.target.name === 'checkedB') {
        //     props.breakService()
        // }
    };

    return (
        <FormGroup>
            {/* <FormControlLabel
                control={<GreySwitch checked={state.checkedA} onChange={handleChange} disabled={state.checkedB} name="checkedA" />}
                label="Inbound-Outbound"
            /> */}
            <FormControlLabel
                control={<GreySwitch checked={state.checkedB} onChange={handleChange} disabled={state.checkedA} name="checkedB" />}
                label="Away-Active"
            />
            {/* <FormControlLabel
        control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label="iOS style"
      />
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography> */}
        </FormGroup>
    );
}
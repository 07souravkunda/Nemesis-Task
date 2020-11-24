import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import Form from '../../components/Form/Form';
import Table from '../Table/Table';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const AppScreen = ({ user, logoutHandler }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className={classes.root}>
      <AppBar
        style={{ background: '#5995fd', justifyContent: 'space-between' }}
        position="static"
      >
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Tabs
            style={{ height: '100%' }}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            TabIndicatorProps={{
              style: { background: '#3e69b5', height: '5px' },
            }}
            //   variant="fullWidth"
            //   aria-label="full width tabs example"
          >
            <Tab label="Create User" {...a11yProps(0)} />
            <Tab label="All Users" {...a11yProps(1)} />
          </Tabs>
          <Button onClick={logoutHandler} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Form />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Table />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default AppScreen;

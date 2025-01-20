/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@mui/material';

const HeaderComponent = ({ title }) => {
  return (
    <AppBar position="static" color="success">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};


export default HeaderComponent;

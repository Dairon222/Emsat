/* eslint-disable react/prop-types */

import { AppBar, Toolbar, Typography } from '@mui/material';

const HeaderComponent = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};


export default HeaderComponent;

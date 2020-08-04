import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from './routes.js';
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';
import logo from 'assets/img/reactlogo.png';
import api from 'constants/api';

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        if (prop.sub) {
          return prop.sub.map((j, k) => {
            return (
              <Route
                path={prop.layout + prop.path + j.subPath}
                component={j.component}
                key={k}
              />
            );
          });
        }
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/tong-quan" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // states and functions
  const settings = JSON.parse(localStorage.getItem('settings'));
  const image =
    settings && settings.header_img
      ? `${api.BASE_URL}${settings.header_img}`
      : require('assets/img/default.png');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Trang chủ'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'blue'}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}

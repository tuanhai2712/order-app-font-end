/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Icon,
  ListItemText,
  ListItem,
  List,
  Hidden,
  Drawer,
  IconButton
} from '@material-ui/core';
import {
  ExpandMore,
  Edit,
  Refresh
} from '@material-ui/icons';
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
//constants
import role from "constants/role"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { SettingActions } from "actions"
import "./style.css"
import Loading from "components/Loading/Loading"

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const settings = JSON.parse(localStorage.getItem("settings"))
  const [editExchangeRate, setEditExchangeRate] = React.useState(false)
  const [newExchangeRate, setNewExchangeRate] = React.useState(settings.exchange_rate)
  const changeSettingLoading = useSelector(state => state.changeSettingLoading)
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  let links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        let listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        if (user.role === role.user_role && prop.role === role.admin_role) {
          return
        }
        if (prop.sub) {
          return (
            <ExpansionPanel className={classes.expansionPanel} key={key}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
                <span>{prop.name}</span>
              </ExpansionPanelSummary>
              {prop.sub.map((j, k) => {
                let listSubItemClasses;
                listSubItemClasses = classNames({
                  [" " + classes[color]]: activeRoute(prop.layout + prop.path + j.subPath)
                });
                return (
                  <ExpansionPanelDetails key={k}>
                    <NavLink
                      to={prop.layout + prop.path + j.subPath}
                      className={classNames(classes.item, classes.subItem)}
                      activeClassName="active"
                    >
                      <ListItem button className={classNames(classes.itemLink, listSubItemClasses)}>
                        <ListItemText
                          primary={j.name}
                          className={classNames(classes.itemText, whiteFontClasses)}
                          disableTypography={true}
                        />
                      </ListItem>
                    </NavLink>
                  </ExpansionPanelDetails>
                )
              })}
            </ExpansionPanel>
          )
        }
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
              )}
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );

  const showEditExchangeRate = () => {
    setEditExchangeRate(true)
  }

  const changeExchangeRate = () => {
    dispatch(SettingActions.changeSetting({
      field: "exchange_rate",
      exchange_rate: newExchangeRate,
    }))
    setEditExchangeRate(false)
  }

  const handleChange = (event) => {
    event.preventDefault()
    setNewExchangeRate(event.target.value)
  }
  const renderExchangeRate = () => {
    if (changeSettingLoading.status && changeSettingLoading.field === "exchange_rate") {
      return (
        <div className="exchange-rate">
          <span>1 RMB = </span>
          <Loading />
        </div>
      )
    }
    if (user.role === role.user_role) {
      return (
        <div className="exchange-rate">
          <span>1 RMB = {settings.exchange_rate} VNĐ</span>
        </div>
      )
    }
    return (
      <div className="exchange-rate">
        {editExchangeRate ?
          <>
            <span>1 RMB = </span>
            <input
              name="exchange_rate"
              onChange={e => handleChange(e)}
              type="number"
              value={newExchangeRate}
            ></input>
            <Refresh onClick={() => changeExchangeRate()}/>
          </>
        :
          <>
            <span>1 RMB = {settings.exchange_rate} VNĐ</span>
            <Edit onClick={() => showEditExchangeRate()}/>
          </>
        }
      </div>
    )
  }
  let brand = (
    <div className={classes.logo}>
      <a
        href="http://localhost:3000/"
        className={classNames(classes.logoLink)}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
      {renderExchangeRate()}
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

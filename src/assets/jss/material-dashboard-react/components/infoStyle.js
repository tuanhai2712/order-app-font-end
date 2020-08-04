import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blackColor,
  title,
} from 'assets/jss/material-dashboard-react.js';

const infoStyle = {
  infoArea: {
    maxWidth: '360px',
    margin: '0 auto',
    padding: '0px',
  },
  iconWrapper: {
    float: 'left',
    marginTop: '24px',
    marginRight: '10px',
  },
  primary: {
    color: primaryColor[0],
  },
  warning: {
    color: warningColor[0],
  },
  danger: {
    color: dangerColor[0],
  },
  success: {
    color: successColor[0],
  },
  info: {
    color: infoColor[0],
  },
  rose: {
    color: roseColor[0],
  },
  gray: {
    color: grayColor[0],
  },
  icon: {
    width: '36px',
    height: '36px',
  },
  descriptionWrapper: {
    color: blackColor,
    overflow: 'hidden',
  },
  title,
  description: {
    color: blackColor,
    overflow: 'hidden',
    marginTop: '0px',
    fontSize: '14px',
  },
  iconWrapperVertical: {
    float: 'none',
  },
  iconVertical: {
    width: '61px',
    height: '61px',
  },
};

export default infoStyle;

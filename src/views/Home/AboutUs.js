import React from 'react';
// reactstrap components
import { Container } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
// core components
import MainNavbar from 'components/Navbars/MainNavbar.js';
import MainPageHeader from 'components/Headers/MainPageHeader.js';
import TransparentFooter from 'components/Footers/TransparentFooter.js';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
// styles
import './style.css';
import styles from 'assets/jss/material-dashboard-react/views/sectionStyle.js';
// redux - actions
import { useDispatch } from 'react-redux';
import { SettingActions } from 'actions';
// constants
const useStyles = makeStyles(styles);
function AboutUs() {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  React.useEffect(() => {
    document.body.classList.add('landing-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    return function cleanup() {
      document.body.classList.remove('landing-page');
      document.body.classList.remove('sidebar-collapse');
    };
  });

  React.useEffect(() => {
    dispatch(SettingActions.getSettings());
    if (token) {
      dispatch(SettingActions.getOverview());
    }
  }, []);

  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <MainPageHeader />
        <Container>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2 className={classes.title}>Về chúng tôi</h2>
              </GridItem>
            </GridContainer>
            <div>
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.textAlignStart}
                >
                  <h4>
                    1. Địa chỉ: Số 76 Đường Hồ Tùng Mậu, TP. Lạng Sơn, Tỉnh Lạng
                    Sơn (Cạnh cây xăng nhà máy xi măng cũ)
                  </h4>
                  <h4>2. Số điện thoại: 0973.191.282 - 0962.629.982</h4>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </Container>
        <TransparentFooter />
      </div>
    </>
  );
}

export default AboutUs;

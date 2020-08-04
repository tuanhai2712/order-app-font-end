import React from 'react';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
// core components
import MainNavbar from 'components/Navbars/MainNavbar.js';
import MainPageHeader from 'components/Headers/MainPageHeader.js';
import TransparentFooter from 'components/Footers/TransparentFooter.js';
import RegisterForm from 'components/Form/RegisterForm.js';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';
// @material-ui/icons
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Search from '@material-ui/icons/Search';
// styles
import './style.css';
import styles from 'assets/jss/material-dashboard-react/views/sectionStyle.js';
// redux - actions
import { useDispatch } from 'react-redux';
import { SettingActions } from 'actions';
// constants
const useStyles = makeStyles(styles);
function HomePage() {
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
                <h2 className={classes.title}>Quy trình đặt hàng</h2>
              </GridItem>
            </GridContainer>
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                  <InfoArea
                    title="Bước 1"
                    description="Đăng ký tài khoản"
                    icon={Fingerprint}
                    iconColor="info"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <InfoArea
                    title="Bước 2"
                    description="Tạo đơn hàng"
                    icon={AddShoppingCart}
                    iconColor="info"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <InfoArea
                    title="Bước 3"
                    description="Đặt cọc (tùy theo giá trị đơn hàng)"
                    icon={AttachMoney}
                    iconColor="info"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <InfoArea
                    title="Bước 4"
                    description="Chúng tôi sẽ tìm kiếm và xử lý đơn hàng"
                    icon={Search}
                    iconColor="info"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <InfoArea
                    title="Bước 5"
                    description="Vận chuyển từ Trung Quốc về Việt Nam"
                    icon={FlightTakeoff}
                    iconColor="info"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <InfoArea
                    title="Bước 6"
                    description="Nhận hàng và thanh toán"
                    icon={VerifiedUser}
                    iconColor="info"
                    vertical
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </Container>
        <div className="section section-about-us">
          <Container>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className="text-align-center">
                <h2 className={classes.title}>Dịch vụ của chúng tôi</h2>
              </GridItem>
            </GridContainer>
            <div className="team mt-20">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <div className="service-img">
                      <img
                        alt="..."
                        className=""
                        src={require('assets/img/sections/dv-dat-hang.png')}
                      ></img>
                    </div>

                    <h4 className="title">Đặt hàng</h4>
                    <p className="description">
                      Nhận đặt hàng từ tất cả các trang thương mại điện tử
                      Taobao.com, 1688.com, Tmall.com,...
                    </p>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <div className="service-img">
                      <img
                        alt="..."
                        className=""
                        src={require('assets/img/sections/dv-ky-gui.png')}
                      ></img>
                    </div>

                    <h4 className="title">Ký gửi hàng hoá</h4>
                    <p className="description">
                      Vận chuyển hàng hóa từ khắp các tỉnh thành của Trung Quốc
                      về Việt Nam
                    </p>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <div className="service-img">
                      <img
                        alt="..."
                        className=""
                        src={require('assets/img/sections/dv-van-chuyen.png')}
                      ></img>
                    </div>
                    <h4 className="title">Tư vấn - Tìm nguồn hàng</h4>
                    <p className="description">
                      Tư vấn miễn phí. Hỗ trợ tìm kiếm nguồn hàng
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="section section-about-us">
          <Container>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className="text-align-center">
                <h2 className={classes.title}>Chính sách</h2>
              </GridItem>
            </GridContainer>
            <div className="team mt-20">
              <Row>
                <Col md="3">
                  <div className="team-player">
                    <div className="service-img">
                      <img
                        alt="..."
                        className=""
                        src={require('assets/img/sections/cs-kiem-hang.png')}
                      ></img>
                    </div>

                    <h4 className="title">Kiểm hàng</h4>
                    <p className="description">
                      Đảm bảo hàng hóa được giao đầy đủ, chính xác.
                    </p>
                  </div>
                </Col>
                <Col md="3">
                  <div className="team-player">
                    <div className="service-img">
                      <img
                        alt="..."
                        className=""
                        src={require('assets/img/sections/cs-van-chuyen.png')}
                      ></img>
                    </div>

                    <h4 className="title">Vận chuyển</h4>
                    <p className="description">
                      Đảm bảo hàng hóa được vận chuyển đúng thời hạn, địa điểm
                    </p>
                  </div>
                </Col>
                <Col md="3">
                  <div className="team-player">
                    <div className="service-img">
                      <img
                        alt="..."
                        className=""
                        src={require('assets/img/sections/cs-thanh-toan.png')}
                      ></img>
                    </div>
                    <h4 className="title">Thanh toán</h4>
                    <p className="description">
                      Xem tại mục Biểu phí và Thanh toán
                    </p>
                  </div>
                </Col>
                <Col md="3">
                  <div className="team-player">
                    <div className="service-img">
                      <img
                        alt="..."
                        className=""
                        src={require('assets/img/sections/cs-khieu-nai.png')}
                      ></img>
                    </div>
                    <h4 className="title">Khiếu nại</h4>
                    <p className="description">
                      Xem thông tin liên hệ tại mục Về chúng tôi
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {!token && (
          <div className="section section-contact-us text-center register-now">
            <Container>
              <h2 className="title">Đăng ký ngay</h2>
              <Row>
                <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                  <RegisterForm />
                </Col>
              </Row>
            </Container>
          </div>
        )}
        <TransparentFooter />
      </div>
    </>
  );
}

export default HomePage;

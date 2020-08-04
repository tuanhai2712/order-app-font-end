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
function PaymentInfoPage() {
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
                <h2 className={classes.title}>Biểu phí</h2>
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
                  <h3>1. Chi phí</h3>
                  <p>CHI PHÍ CHO 1 ĐƠN HÀNG BAO GỒM:</p>
                  <p>
                    Tổng giá thanh toán = [Giá tiền hàng trên web + tiền ship(VN
                    + TQ)] x tỷ giá + Phí Dịch Vụ + Cước Vận Chuyển TQ - VN​
                  </p>
                  <h3>2. Bảng phí dịch vụ</h3>
                  <p>
                    Là phí dịch vụ quý khách trả cho chúng tôi để giao dịch với
                    nhà cung cấp và thực hiện mua hàng theo yêu cầu trên đơn
                    hàng. Giá trị tiền hàng để tính phí dịch vụ được tính trên
                    tổng tiền hàng theo đơn hàng của quý khách.
                  </p>
                  <p className="tl-center">
                    <img
                      alt="..."
                      className=""
                      src={require('assets/img/sections/bang-phi-dich-vu.jpg')}
                    ></img>
                  </p>
                  <h3>3. Cước vận chuyển</h3>
                  <p>
                    Là chi phí chuyển hàng từ kho Trung Quốc về các kho Việt
                    Nam.
                  </p>
                  <p className="tl-center">
                    <img
                      alt="..."
                      className=""
                      src={require('assets/img/sections/cuoc-van-chuyen.jpg')}
                    ></img>
                  </p>

                  <h4>Lưu ý</h4>
                  <p>- Cân nặng tối thiểu để tính phí là 0.5kg.</p>
                  <p>
                    - Đối với khách hàng ở HN với HCM chỉ nhận giả đầu bao trên
                    200kg giả tại nhà còn ít hơn hàng sẽ quay về kho Lạng Sơn
                    sau đó chuyển xe khách hoặc GHTK ( khách chịu phí)
                  </p>

                  <p>
                    - Thời gian vận chuyển hàng Đi trong nhanh từ kho TQ về kho
                    VN là 1-2 ngày (hạn chế hàng cồng kềnh).
                  </p>
                  <p>
                    - Thời gian vận chuyển hàng Đi thường là 4-6 ngày (hạn chế
                    hàng fake, mỹ phẩm, dung dịch dạng lỏng, bột, nước đồ điện
                    tử…).
                  </p>
                  <p>
                    - Đối với khách hàng nhận hàng khác tỉnh sẽ tính cước đên
                    kho lạng sơn + tiền xe khách hoặc GHTK
                  </p>
                  <p>
                    - Đối với các mặt hàng nhẹ và có thể tích lớn sẽ tính phí
                    vận chuyển dựa trên trọng lượng quy đổi
                  </p>
                  <p>
                    - Trọng lượng quy đổi được tính theo công thức: KG = Chiều
                    dài (cm) * Chiều rộng (cm) * Chiều cao (cm)/6000
                  </p>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2 className={classes.title}>Thanh toán</h2>
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
                  <p className="tl-center">
                    <img
                      alt="..."
                      className=""
                      src={require('assets/img/sections/thanh-toan.jpg')}
                    ></img>
                  </p>
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

export default PaymentInfoPage;

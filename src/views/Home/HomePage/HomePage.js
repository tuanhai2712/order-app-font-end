import React from "react";
// reactstrap components
import {
  Container,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import MainPageHeader from "components/Headers/MainPageHeader.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import RegisterForm from "components/Form/RegisterForm.js";
import SingleUpload from "components/ImageUpload/SingleUpload.js";
import Loading from "components/Loading/Loading"
// styles
import "./style.css"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { SettingActions } from "actions"
// constants
import api from "constants/api"


function HomePage() {
  const [pills, setPills] = React.useState("1");
  const token = localStorage.getItem("token")
  const changeSettingLoading = useSelector(state => state.changeSettingLoading)
  const settings = useSelector(state => state.settings)
  const imgProcudure = settings && settings.procedure_img ? `${api.BASE_URL}${settings.procedure_img}` : require("assets/img/defaut.png")
  const imgPrice = settings && settings.price_img ? `${api.BASE_URL}${settings.price_img}` : require("assets/img/defaut.png")
  const imgPay = settings && settings.pay_img ? `${api.BASE_URL}${settings.pay_img}` : require("assets/img/defaut.png")
  const dispatch = useDispatch()
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  React.useEffect(() => {
    dispatch(SettingActions.getSettings())
    if (token) {
      dispatch(SettingActions.getOverview())
    }
  }, [])
  
  const tabTitle = () => {
    switch (pills) {
      case "2":
        return "Bảng giá"
      case "3":
        return "Thanh toán"
      default:
        return "Quy trình"
    }
  }
  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <MainPageHeader />
        <div className="section section-about-us">
          <Container>
            <div className="content-homepage">
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">{tabTitle()}</h4>
                <div className="nav-align-center nav-mb-20">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="fa fa-cogs" aria-hidden="true"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        <i className="fa fa-credit-card" aria-hidden="true"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="12">
                        <img
                          alt="..."
                          className="img-raised"
                          src={imgProcudure}
                        ></img>
                      </Col>
                      {changeSettingLoading.status && changeSettingLoading.field === "procedure_img" && <Loading />}
                      <SingleUpload field="procedure_img"/>
                    </Row>
                  </Col>
                </TabPane>
                <TabPane tabId="pills2">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="12">
                        <img
                          alt="..."
                          className="img-raised"
                          src={imgPrice}
                        ></img>
                      </Col>
                      {changeSettingLoading.status && changeSettingLoading.field === "price_img" && <Loading />}
                      <SingleUpload field="price_img" />
                    </Row>
                  </Col>
                </TabPane>
                <TabPane tabId="pills3">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="12">
                        <img
                          alt="..."
                          className="img-raised"
                          src={imgPay}
                        ></img>
                      </Col>
                      {changeSettingLoading.status && changeSettingLoading.field === "pay_img" && <Loading />}
                      <SingleUpload field="pay_img" />
                    </Row>
                  </Col>
                </TabPane>
              </TabContent>
            </div>
          </Container>
        </div>
        {!token && 
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
        }
        <TransparentFooter />
      </div>
    </>
  );
}

export default HomePage;

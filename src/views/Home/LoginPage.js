import React from 'react';

// reactstrap components
import { Card, CardHeader, Form, Container, Col } from 'reactstrap';
// core components
import MainNavbar from 'components/Navbars/MainNavbar.js';
import TransparentFooter from 'components/Footers/TransparentFooter.js';
import LoginForm from 'components/Form/LoginForm';
import api from 'constants/api';
function LoginPage() {
  const settings = JSON.parse(localStorage.getItem('settings'));
  const img =
    settings && settings.header_img
      ? `${api.BASE_URL}${settings.header_img}`
      : require('assets/img/default.png');
  React.useEffect(() => {
    document.body.classList.add('login-page');
    document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('login-page');
      document.body.classList.remove('sidebar-collapse');
    };
  });
  return (
    <>
      <MainNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: 'url(' + img + ')',
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form className="form">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require('assets/img/now-logo.png')}
                      ></img>
                    </div>
                  </CardHeader>
                  <LoginForm />
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;

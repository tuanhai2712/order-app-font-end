import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from 'reactstrap';
import './style.css';

function MainNavbar() {
  const [navbarColor, setNavbarColor] = React.useState('navbar-transparent');
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor('');
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor('navbar-transparent');
      }
    };
    window.addEventListener('scroll', updateNavbarColor);
    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle('nav-open');
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={'fixed-top ' + navbarColor} color="info" expand="lg">
        <Container>
          <div className="navbar-translate">
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle('nav-open');
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem className="contact"></NavItem>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Trang chủ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/bieu-phi-thanh-toan" tag={Link}>
                  {`Biểu phí & Thanh toán`}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/ve-chung-toi" tag={Link}>
                  Về chúng tôi
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={token ? '/admin' : '/dang-nhap'} tag={Link}>
                  Đặt hàng
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/tra-cuu" tag={Link}>
                  Tra cứu hàng hóa ký gửi
                </NavLink>
              </NavItem>
              {token ? (
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    href="#pablo"
                    nav
                    onClick={(e) => e.preventDefault()}
                  >
                    <i
                      aria-hidden={true}
                      className="now-ui-icons users_single-02"
                    ></i>
                    <span className="nav-user-name">{user.name}</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem to="/ho-so" tag={Link}>
                      Tài khoản
                    </DropdownItem>
                    <DropdownItem onClick={(e) => logout(e)}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavItem>
                  <NavLink to="/dang-nhap" tag={Link}>
                    Đăng nhập
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;

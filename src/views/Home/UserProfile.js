import React from "react";

// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  CardFooter,
  Input,
  InputGroup,
} from "reactstrap";

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import Footer from "components/Footers/TransparentFooter.js";
import Loading from "components/Loading/Loading"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { AuthActions } from "actions"
// constants
import { validateForm } from "constants/validate"
// styles
import { isEmpty } from "lodash"

function UserProfile() {
  const dispatch = useDispatch()
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const loading = useSelector(state => state.loading);
  const resetPassword = useSelector(state => state.resetPassword);
  const user = JSON.parse(localStorage.getItem("user"))
  const [err, setErr] = React.useState({})
  const [newPassword, setNewPassword] = React.useState({
    'current_password': "",
    'new_password': "",
    'confirm_new_password': "",
    'user_id': user.id
  })
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  React.useEffect(() => {
    setErr({'current_password': resetPassword.err})
  }, [resetPassword])
  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setErr({...err, [name]: ""})
    setNewPassword({...newPassword, [name]: value})
  }

  const update = (event) => {
    event.preventDefault()
    const error = validateForm(newPassword)
    if (isEmpty(error)) {
      dispatch(AuthActions.resetPassword(newPassword))
    }
    setErr(error)
  }
  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <ProfilePageHeader />
        <div className="section">
          <Container>
          <Col className="text-center ml-auto mr-auto" lg="6" md="8">
          <div className="form">
            {loading && <Loading />}
            <CardBody>
              <InputGroup
                className={
                  "no-border input-lg" +
                  (lastFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  name="current_password"
                  onChange={e => handleChange(e)}
                  placeholder="Mật khẩu cũ"
                  type="password"
                  onFocus={() => setLastFocus(true)}
                  onBlur={() => setLastFocus(false)}
                ></Input>
              </InputGroup>
              {err && err.current_password && <p className="err-mess">{err.current_password}</p>}
              <InputGroup
                className={
                  "no-border input-lg" +
                  (lastFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Mật khẩu mới..."
                  name="new_password"
                  onChange={e => handleChange(e)}
                  type="password"
                  onFocus={() => setLastFocus(true)}
                  onBlur={() => setLastFocus(false)}
                ></Input>
              </InputGroup>
              {err && err.new_password && <p className="err-mess">{err.new_password}</p>}
              <InputGroup
                className={
                  "no-border input-lg" +
                  (lastFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Nhập lại mật khẩu mới..."
                  name="confirm_new_password"
                  onChange={e => handleChange(e)}
                  type="password"
                  onFocus={() => setLastFocus(true)}
                  onBlur={() => setLastFocus(false)}
                ></Input>
              </InputGroup>
              {err && err.confirm_new_password && <p className="err-mess">{err.confirm_new_password}</p>}
            </CardBody>
            <CardFooter className="text-center register-button">
              <Button
                block
                className="btn-round btn"
                color="info"
                onClick={e => update(e)}
                size="lg"
              >
                Đổi mật khẩu
              </Button>
            </CardFooter>
          </div>
          </Col>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default UserProfile;

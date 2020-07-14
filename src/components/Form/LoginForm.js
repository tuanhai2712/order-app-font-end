import React from "react";

// reactstrap components
import {
  Button,
  CardBody,
  CardFooter,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavLink
} from "reactstrap";
// library
import { Link } from "react-router-dom";
import { isEmpty } from "lodash"
// core components
import Loading from "components/Loading/Loading"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { AuthActions } from "actions"
// constants
import { validateForm } from "constants/validate"
// styles
import "./style.css"

function LoginForm() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)
  const [err, setErr] = React.useState({})
  const [data, setData] = React.useState({
    email: "",
    password: "",
  })

  const login = (event) => {
    event.preventDefault()
    const error = validateForm(data)
    console.log(error)
    if (isEmpty(error)) {
      dispatch(AuthActions.login(data))
    }
    setErr(error)
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setErr({...err, [name]: ""})
    setData({...data, [name]: value})
  }
  return (
    <>
      {loading && <Loading />}
      <CardBody>
        <InputGroup
          className={
            "no-border input-lg" +
            (firstFocus ? " input-group-focus" : "")
          }
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_email-85"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            name="email"
            onChange={e => handleChange(e)}
            placeholder="Email..."
            type="text"
            onFocus={() => setFirstFocus(true)}
            onBlur={() => setFirstFocus(false)}
          ></Input>
        </InputGroup>
        {err && err.email && <p className="err-mess">{err.email}</p>}
        <InputGroup
          className={
            "no-border input-lg" +
            (lastFocus ? " input-group-focus" : "")
          }
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_lock-circle-open"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            name="password"
            onChange={e => handleChange(e)}
            placeholder="Mật khẩu..."
            type="password"
            onFocus={() => setLastFocus(true)}
            onBlur={() => setLastFocus(false)}
          ></Input>
        </InputGroup>
        {err && err.password && <p className="err-mess">{err.password}</p>}
      </CardBody>
      <CardFooter className="text-center">
        <Button
          block
          className="btn-round"
          color="info"
          href="#pablo"
          onClick={e => login(e)}
          size="lg"
        >
          Đăng nhập
        </Button>
        <div className="pull-left">
          <NavLink className="pd-top-8">
            <span className="fs-13 cl-white">Bạn chưa có tài khoản ?</span>
          </NavLink>
        </div>
        <div className="pull-right">
          <NavLink className="pd-top-8" to="/dang-ky" tag={Link}>
            <span className="fs-13 cl-white">Đăng ký</span>
          </NavLink>
        </div>
      </CardFooter>
    
    </>
  );
}

export default LoginForm;

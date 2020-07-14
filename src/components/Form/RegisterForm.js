import React from "react";

// reactstrap components
import {
  Button,
  CardBody,
  CardFooter,
  Input,
  InputGroup,
} from "reactstrap";
// core components
import Loading from "components/Loading/Loading"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { AuthActions } from "actions"
// constants
import { validateForm } from "constants/validate"
// styles
import "./style.css"
import { isEmpty } from "lodash"

function RegisterForm() {
  const dispatch = useDispatch()
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const loading = useSelector(state => state.loading)
  const [err, setErr] = React.useState({})
  const [data, setData] = React.useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    address: ""
  })

  const register = (event) => {
    event.preventDefault()
    const error = validateForm(data)
    if (isEmpty(error)) {
      dispatch(AuthActions.register(data))
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
      <div className="form">
        {loading && <Loading />}
        <CardBody>
          <InputGroup
            className={
              "no-border input-lg" +
              (firstFocus ? " input-group-focus" : "")
            }
          >
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
              (firstFocus ? " input-group-focus" : "")
            }
          >
            <Input
              name="name"
              onChange={e => handleChange(e)}
              placeholder="Họ và tên..."
              type="text"
              onFocus={() => setFirstFocus(true)}
              onBlur={() => setFirstFocus(false)}
            ></Input>
          </InputGroup>
          {err && err.name && <p className="err-mess">{err.name}</p>}
          <InputGroup
            className={
              "no-border input-lg" +
              (firstFocus ? " input-group-focus" : "")
            }
          >
            <Input
              name="phone_number"
              onChange={e => handleChange(e)}
              placeholder="Số điện thoại..."
              type="text"
              onFocus={() => setFirstFocus(true)}
              onBlur={() => setFirstFocus(false)}
            ></Input>
          </InputGroup>
          {err && err.phone_number && <p className="err-mess">{err.phone_number}</p>}
          <InputGroup
            className={
              "no-border input-lg" +
              (firstFocus ? " input-group-focus" : "")
            }
          >
            <Input
              name="address"
              onChange={e => handleChange(e)}
              placeholder="Địa chỉ..."
              type="text"
              onFocus={() => setFirstFocus(true)}
              onBlur={() => setFirstFocus(false)}
            ></Input>
          </InputGroup>
          {err && err.address && <p className="err-mess">{err.address}</p>}
          <InputGroup
            className={
              "no-border input-lg" +
              (lastFocus ? " input-group-focus" : "")
            }
          >
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
          <InputGroup
            className={
              "no-border input-lg" +
              (lastFocus ? " input-group-focus" : "")
            }
          >
            <Input
              placeholder="Nhập lại mật khẩu..."
              name="confirm_password"
              onChange={e => handleChange(e)}
              type="password"
              onFocus={() => setLastFocus(true)}
              onBlur={() => setLastFocus(false)}
            ></Input>
          </InputGroup>
          {err && err.confirm_password && <p className="err-mess">{err.confirm_password}</p>}
        </CardBody>
        <CardFooter className="text-center register-button">
          <Button
            block
            className="btn-round btn"
            color="info"
            href="#pablo"
            onClick={e => register(e)}
            size="lg"
          >
            Đăng ký
          </Button>
        </CardFooter>
      </div>
    </>
  );
}

export default RegisterForm;

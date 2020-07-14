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
import Footer from "components/Footers/TransparentFooter.js";
import Loading from "components/Loading/Loading"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { OrderActions } from "actions"
// constants
import { validateForm } from "constants/validate"
// styles
import { isEmpty } from "lodash"
import MainPageHeader from "components/Headers/MainPageHeader";

function FindConsignment() {
  const dispatch = useDispatch()
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const loading = useSelector(state => state.loading);
  const findWaybillCodeResult = useSelector(state => state.findWaybillCodeResult);
  const [err, setErr] = React.useState({})
  const [waybillCode, setWaybillCode] = React.useState({
    'waybill_code': "",
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

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setErr({...err, [name]: ""})
    setWaybillCode({...waybillCode, [name]: value})
  }

  const find = (event) => {
    event.preventDefault()
    const error = validateForm(waybillCode)
    if (isEmpty(error)) {
      dispatch(OrderActions.findWaybillCode(waybillCode))
    }
    setErr(error)
  }

  const renderStatus = (status) => {
    if (parseInt(status) === 0) {
      return "ĐÃ NHẬP KHO TQ"
    }
      return "ĐÃ NHẬP KHO VN"
  }
  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <MainPageHeader />
        <div className="section">
          <Container>
          <Col className="text-center ml-auto mr-auto" lg="6" md="8">
          <div className="form">
            {loading && <Loading />}
            <table className="table-result-find-waybill-code">
              <thead>
                <tr>
                  <td>Mã vận đơn</td>
                  <td>Tình trạng</td>
                  <td>Lần cập nhật cuối</td>
                </tr>
              </thead>
                {Object.keys(findWaybillCodeResult).length ?
                  <tbody>
                      <tr>
                        <td>{findWaybillCodeResult.ma_van_don}</td>
                        <td>{renderStatus(findWaybillCodeResult.tinh_trang)}</td>
                        <td>{findWaybillCodeResult.updated_at}</td>
                      </tr>
                  </tbody>
                  : null
                }
            </table>
            {!Object.keys(findWaybillCodeResult).length && <div><p>Không tìm thấy kết quả</p></div>}
            <CardBody>
              <InputGroup
                className={
                  "no-border input-lg" +
                  (lastFocus ? " input-group-focus" : "")
                }
              >
                <Input
                  placeholder="Nhập mã vận đơn"
                  name="waybill_code"
                  onChange={e => handleChange(e)}
                  type="text"
                  onFocus={() => setLastFocus(true)}
                  onBlur={() => setLastFocus(false)}
                ></Input>
              </InputGroup>
              {err && err.waybill_code && <p className="err-mess">{err.waybill_code}</p>}
            </CardBody>
            <CardFooter className="text-center register-button">
              <Button
                block
                className="btn-round btn"
                color="info"
                onClick={e => find(e)}
                size="lg"
              >
                Tra cứu
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

export default FindConsignment;

import React from "react";

// reactstrap components
import {
  Container,
  Col,
  Button,
  CardBody,
  CardFooter,
  Input,
  InputGroup,
  FormGroup,
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
import { statistic } from "constants/order"

function FindConsignment() {
  const dispatch = useDispatch()
  const [lastFocus, setLastFocus] = React.useState(false);
  const loading = useSelector(state => state.loading);
  const findWaybillCodeResult = useSelector(state => state.findWaybillCodeResult);
  const [err, setErr] = React.useState({})
  const [waybillCode, setWaybillCode] = React.useState({
    'waybill_code': "",
    'search_type_goods': 0
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
    const { name, value } = event.target
    setErr({...err, [name]: ""})
    if (name === "search_type_goods") {
      setWaybillCode({...waybillCode, [name]: parseInt(value)})
    } else {
      setWaybillCode({...waybillCode, [name]: value})
    }
  }
  const find = (event) => {
    event.preventDefault()
    const error = validateForm(waybillCode)
    if (isEmpty(error)) {
      dispatch(OrderActions.findWaybillCode(waybillCode))
    }
    setErr(error)
  }

  const renderStatus = (status, typeGoods) => {
    if (!typeGoods) {
      if (status === 0) {
        return "ĐÃ NHẬP KHO TQ"
      }
      if (status === 1) {
        return "ĐÃ NHẬP KHO VN"
      }
      return "ĐÃ TRẢ HÀNG"
    }
    return statistic[parseInt(status)]
  }
  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <MainPageHeader />
        <div className="section">
          <Container>
            <Col className="ml-auto mr-auto" lg="6" md="8">
              <FormGroup tag="fieldset">
                <legend>Loại hàng hóa</legend>
                <div className="radio-button-container">
                  <input checked={!waybillCode.search_type_goods} type="radio" value={0} name="search_type_goods" className="radio-button" onClick={(e) => handleChange(e)} />
                  <span>Hàng ký gửi</span>
                  <input checked={waybillCode.search_type_goods} type="radio" value={1} name="search_type_goods" className="radio-button" onClick={(e) => handleChange(e)}/>
                  <span>Hàng order</span>
                </div>
              </FormGroup>
              <div className="form text-center ">
                {loading && <Loading />}
                <table className="table-result-find-waybill-code">
                  <thead>
                    <tr>
                      <td>Mã vận đơn</td>
                      <td>Tình trạng</td>
                      <td>Lần cập nhật cuối</td>
                    </tr>
                  </thead>
                    {findWaybillCodeResult.data && Object.keys(findWaybillCodeResult.data).length ?
                      <tbody>
                          <tr>
                            <td>{findWaybillCodeResult.data.ma_van_don}</td>
                            <td>{renderStatus(findWaybillCodeResult.data.tinh_trang, findWaybillCodeResult.search_type_goods)}</td>
                            <td>{findWaybillCodeResult.data.updated_at}</td>
                          </tr>
                      </tbody>
                      : null
                    }
                </table>
                {!findWaybillCodeResult.data && <div><p>Không tìm thấy kết quả</p></div>}
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

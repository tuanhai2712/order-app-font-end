import React from "react";
// react plugins that creates an input with a date picker
import {
  Button,
  FormGroup,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  Form,
  Label,
  Input,
} from "reactstrap";
// core components
import MultipleUpload from "components/ImageUpload/MultipleUpload.js";
import FilterInput from "components/Filter/FilterInput.js";
import Success from "components/Alert/Success"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { OrderActions } from "actions"
// constants
import { validateForm } from "constants/validate"
import role from "constants/role"
import { isEmpty } from "lodash"
import "./style.css"
import { SystemActions } from "actions";
import Loading from "components/Loading/Loading";


function CreateOrderModal(props) {
  const dispatch = useDispatch()
  const settings = JSON.parse(localStorage.getItem("settings"))
  const [open, setOpen] = React.useState(false)
  const [err, setErr] = React.useState({})
  const createOrderResult = useSelector(state => state.createOrderResult)
  const loading = useSelector(state => state.loading)
  const user = JSON.parse(localStorage.getItem("user"))
  const [data, setData] = React.useState({
    customer_id: null,
    link: "",
    files: [],
    user_id: user.id,
    role: user.role,
    note: "",
    ten_san_pham: ""
  })
  const handleOpen = (status) => {
    data.customer_id = null;
    data.link = "";
    data.files = [];
    setData(data)
    setErr({})
    setOpen(status)
    dispatch(SystemActions.clear())
  }
  const getPictureFiles = (files) => {
    setData({...data, ["files"]: files})
  }

  const create = () => {
    const error = validateForm(data)
    if (user.role == role.admin_role) {
      if (!data.customer_id) {
          error.customer_id = "Lựa chọn khách hàng"
      }
    }
    data.ty_gia = settings.exchange_rate
    if (isEmpty(error)) {
      dispatch(OrderActions.create(data))
    }
    setErr(error)
  }

  const selectCustomer = (customerId) => {
    setData({...data, ["customer_id"]: customerId})
    setErr({...err, ["customer_id"]: null})
  }
  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setData({...data, [name]: value})
  }

  return (
      <div className="modal-container">
        <Button color="success" type="button" onClick={() => handleOpen(true)}>
          Tạo đơn
        </Button>
        <Container>
          <Row id="modals">
            <Col md="6">
              <Modal isOpen={open} toggle={() => handleOpen(false)}>
                <div className="modal-header justify-content-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => handleOpen(false)}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">Tạo đơn hàng</h4>
                </div>
                {createOrderResult && <Success mess={"Tạo đơn hàng thành công"} visible={createOrderResult}/>}
                {loading ? <Loading /> : null}
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label>Link sản phẩm</Label>
                      <Input type="link" name="link" placeholder="Nhập link sản phẩm" onChange={e => handleChange(e)}/>
                    </FormGroup>
                    {err && err.link && <p className="err-mess">{err.link}</p>}
                    <FormGroup>
                      <Label>Tên sản phẩm</Label>
                      <Input type="text" name="ten_san_pham" placeholder="Nhập tên sản phẩm" onChange={e => handleChange(e)}/>
                    </FormGroup>
                    <FormGroup>
                      <Label>Ghi chú</Label>
                      <Input type="textarea" name="note" className="note-field" placeholder="Nhập ghi chú" onChange={e => handleChange(e)}/>
                    </FormGroup>
                    {user.role == role.admin_role &&
                      <>
                        <FilterInput selectCustomer={customerId => selectCustomer(customerId)}/>
                        {err && err.customer_id && <p className="err-mess mt-10">{err.customer_id}</p>}
                      </>
                    }
                    <MultipleUpload
                      getPictureFiles={files => getPictureFiles(files)}
                      pictureFiles={data.files}
                    />
                  </Form>
                </ModalBody>
                <div className="modal-footer">
                  <Button color="success" type="button" onClick={() => create()}>
                    Tạo đơn
                  </Button>
                  <Button
                    color="danger"
                    type="button"
                    onClick={() => handleOpen(false)}
                  >
                    Đóng
                  </Button>
                </div>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default CreateOrderModal;

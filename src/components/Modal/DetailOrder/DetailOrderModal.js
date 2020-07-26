import React from "react";
// react plugins that creates an input with a date picker
import { makeStyles } from "@material-ui/core/styles";
// reactstrap components
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
  Input
} from "reactstrap";
//material-ui-icons
import Visibility from "@material-ui/icons/Visibility";
// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import FilterInput from "components/Filter/FilterInput.js";
import Success from "components/Alert/Success"
import Loading from "components/Loading/Loading"
import style from "./style.css"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { OrderActions, SystemActions } from "actions"
//image viewer
import ImageViewer from "react-simple-image-viewer";
//constants
import api from "constants/api"
import role from "constants/role"

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import regex from "constants/regex";

const useStyles = makeStyles(styles);
function DetailOrderModal(props) {
  const dispatch = useDispatch()
  const images = useSelector(state => state.imageOrders)
  const updateOrderResult = useSelector(state => state.updateOrderResult)
  const updateOrderLoading = useSelector(state => state.updateOrderLoading)
  const user = JSON.parse(localStorage.getItem("user"))
  const [orderDetail, setOrderDetail] = React.useState(props.order)
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)

  const handleOpen = (status) => {
    setOpen(status)
    dispatch(SystemActions.clear())
  }

  React.useEffect(() => {
    if (open) {
      const orderId = orderDetail.id
      dispatch(OrderActions.getImageOrder(orderId))
    }
  }, [open]);

  const openImageViewer = React.useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const getImagesViewer = () => {
    let imgs = []
    images.map(img => {
      imgs.push(`${api.BASE_URL}${img.url}`)
    })
    return imgs
  }

  const selectCustomer = (customerId) => {
    setOrderDetail({...orderDetail, ['user_id']: customerId})
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setOrderDetail({...orderDetail, [name]: value})
  }

  const total = () => {
    const { gia_thuc_te, phi_ship_tq, phi_ship_vn, ty_gia, khoi_luong } = orderDetail
    const total = ((parseInt(gia_thuc_te) * 1.03 + parseInt(phi_ship_tq)) * parseInt(ty_gia)) + parseInt(phi_ship_vn) + (parseInt(khoi_luong) * 3000)
    return Math.floor((total/1000)) * 1000
  }
  const update = () => {
    dispatch(SystemActions.clear())
    dispatch(OrderActions.updateOrder(orderDetail))
  }

  const disabledField = () => {
    if (user.role == role.admin_role) {
      if (orderDetail.tinh_trang <= 1) {
        return false
      }
      return true
    }
    if (orderDetail.tinh_trang === 0) {
      return false
    }
    return true
  }

  const renderUpdateButton = () => {
    if (user.role == role.admin_role && orderDetail.tinh_trang <= 1) {
      return (
        <Button color="primary" type="button" onClick={() => update()}>
          Cập nhập
        </Button>
      )
    }
    if (user.role != role.admin_role && orderDetail.tinh_trang < 1) {
      return (
        <Button color="primary" type="button" onClick={() => update()}>
          Cập nhập
        </Button>
      )
    }
    return null
  }
  const renderPriceForMass = (mass) => {
    const { price1, price2, price3, price4 } = orderDetail
    if (mass) {
      if (0 < mass < 10) {
        return mass * parseInt(price1)
      } else if (10 < mass < 50) {
        return mass * parseInt(price2)
      } else if (50 < mass < 100) {
        return mass * parseInt(price3)
      }
      return mass * parseInt(price4)
    }
  }
  return (
      <div>
        <Tooltip
          id="tooltip-top"
          title="Xem chi tiết"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
                aria-label="Detail"
                className={classes.tableActionButton}
                onClick={() => handleOpen(true)}
            >
              <Visibility
                className={
                    classes.tableActionButtonIcon + " " + classes.detail
                  }
              />
            </IconButton>
          </Tooltip>
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
                  <h4 className="title title-up">Thông tin đơn hàng</h4>
                </div>
                {updateOrderLoading && <Loading />}
                {updateOrderResult && <Success mess={"Cập nhật đơn hàng thành công"} visible={updateOrderResult}/>}
                <ModalBody>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <span className="search-text">Thông tin sản phẩm</span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Form className="form-container">
                        <FormGroup className="group-field">
                          <Label className="field-label">Mã đơn hàng:</Label>
                          <Input
                            className="field-input"
                            disabled
                            type="text"
                            name="ma_don_hang"
                            value={orderDetail.id}
                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Link sản phẩm:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="link"
                            value={orderDetail.link_san_pham}
                            placeholder="Nhập link sản phẩm"
                            onChange={e => handleChange(e)}
                            disabled={disabledField()}

                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Tên sản phẩm:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="ten_san_pham"
                            placeholder="Nhập tên sản phẩm"
                            value={orderDetail.ten_san_pham}
                            onChange={e => handleChange(e)}
                            disabled={disabledField()}
                          />
                        </FormGroup>
                        {user.role == role.admin_role &&
                          <FormGroup className="group-field">
                            <Label className="field-label">Giá thực chi:</Label>
                            <Input
                              className="field-input"
                              type="text"
                              name="gia_thuc_chi"
                              placeholder="Nhập giá thực chi"
                              value={orderDetail.gia_thuc_chi}
                              onChange={e => handleChange(e)}
                              disabled={disabledField()}
                            />
                          </FormGroup>
                        }
                        <FormGroup className="group-field">
                          <Label className="field-label">Mã vận đơn:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="ma_van_don"
                            value={orderDetail.ma_van_don || ""}
                            onChange={e => handleChange(e)}
                            disabled={(user.role != role.admin_role) || orderDetail.tinh_trang > 1}
                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Khối lượng (Kg):</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="khoi_luong" 
                            value={orderDetail.khoi_luong}
                            disabled
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Ghi chú</Label>
                          <Input
                            type="textarea"
                            name="note"
                            value={orderDetail.note}
                            className="note-field"
                            placeholder="Nhập ghi chú"
                            onChange={e => handleChange(e)}
                            disabled={disabledField()}
                          />
                        </FormGroup>
                        {user.role === role.admin_role &&
                          <FormGroup>
                            <FilterInput selected={true} customerId={orderDetail.user_id} selectCustomer={customerId => selectCustomer(customerId)} disabled={disabledField()}/>
                          </FormGroup>
                        }
                        
                        {images.length ?
                          <FormGroup>
                            <div className="img-upload-container">
                              {images.map((img, index) => {
                                return (
                                  <div className="simple-img" key={index}>
                                    <img
                                      src={`${api.BASE_URL}${img.url}`}
                                      width={105}
                                      height={105}
                                      onClick={() => openImageViewer(index)}
                                    />
                                  </div>
                              )})}
                            </div>
                            {isViewerOpen && (
                              <ImageViewer
                                src={getImagesViewer()}
                                currentIndex={currentImage}
                                onClose={closeImageViewer}
                                backgroundStyle={{
                                  backgroundColor: "rgba(0,0,0,0.9)"
                                }}
                              />
                            )}
                          </FormGroup>
                          : null
                        }
                      </Form>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <span className="search-text">Thông tin thanh toán</span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Form className="form-container">
                        <FormGroup className="group-field">
                          <Label className="field-label">Tỷ giá (VNĐ) [1]:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="ty_gia"
                            disabled
                            value={orderDetail.ty_gia}
                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Giá (RMB) [2]:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="gia_thuc_te"
                            placeholder="Giá"
                            value={orderDetail.gia_thuc_te}
                            onChange={e => handleChange(e)}
                            disabled={(user.role != role.admin_role) || orderDetail.tinh_trang > 1}
                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Phí (3%) (RMB) [3]:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            disabled
                            value={Math.round(parseInt(orderDetail.gia_thuc_te) * 0.03 * 1000)/1000}
                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Phí ship TQ (RMB) [4]:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="phi_ship_tq"
                            placeholder="Phí vận chuyển - TQ"
                            value={orderDetail.phi_ship_tq}
                            onChange={e => handleChange(e)}
                            disabled={(user.role != role.admin_role) || orderDetail.tinh_trang > 1}
                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Phí ship VN (VNĐ) [5]:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="phi_ship_vn"
                            placeholder="Phí vận chuyển - VN"
                            value={orderDetail.phi_ship_vn}
                            onChange={e => handleChange(e)}
                            disabled={(user.role != role.admin_role) || orderDetail.tinh_trang > 1}
                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Tiền cân (VNĐ) [6]:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="khoi_luong"
                            disabled
                            value={renderPriceForMass(orderDetail.khoi_luong)}
                            onChange={e => handleChange(e)}
                          />
                        </FormGroup>
                        <FormGroup className="group-field">
                          <Label className="field-label">Đã thanh toán (VNĐ) [7]:</Label>
                          <Input
                            className="field-input"
                            type="text"
                            name="dat_coc"
                            placeholder="Đã thanh toán"
                            value={orderDetail.dat_coc}
                            onChange={e => handleChange(e)}
                            disabled={(user.role != role.admin_role) || orderDetail.tinh_trang > 1}
                          />
                        </FormGroup>
                      </Form>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <Form className="form-total-container">
                    <FormGroup className="form-total">
                      <Label className="title-form-total">Tổng phí [1 x (2 + 3 + 4) + 5 + 6]</Label>
                      <Label className="text-form-total">{`${String(parseInt(total())).replace(regex.price,'$1.')}  VNĐ`}</Label>
                    </FormGroup>
                    <FormGroup className="form-total">
                      <Label className="title-form-total">Đã thanh toán [7]</Label>
                      <Label className="text-form-total">{String(parseInt(orderDetail.dat_coc) || 0).replace(regex.price,'$1.')} VNĐ</Label>
                    </FormGroup>
                    <FormGroup className="form-total">
                      <Label className="title-form-total">Còn thiếu</Label>
                      <Label className="text-form-total">{String(parseInt(total()) - parseInt(orderDetail.dat_coc)).replace(regex.price,'$1.') || 0} VNĐ</Label>
                    </FormGroup>
                  </Form>
                </ModalBody>
                <div className="modal-footer">
                  {renderUpdateButton()}
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

export default DetailOrderModal;

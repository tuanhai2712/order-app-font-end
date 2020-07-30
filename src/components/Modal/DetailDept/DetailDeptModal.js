import React from 'react';
// react plugins that creates an input with a date picker
import { makeStyles } from '@material-ui/core/styles';
// reactstrap components
import { Button, Container, Modal, ModalBody, Row, Col } from 'reactstrap';
//material-ui-icons
import Visibility from '@material-ui/icons/Visibility';
// @material-ui/core components
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tasksStyle.js';

import DetailDeptTable from 'components/Table/DetailDeptTable';
import './style.css';
import { dept } from 'variables/dept.js';

const useStyles = makeStyles(styles);
function DetailDeptModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (status) => {
    setOpen(status);
  };
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
            className={classes.tableActionButtonIcon + ' ' + classes.detail}
          />
        </IconButton>
      </Tooltip>
      <Container>
        <Row id="modals">
          <Col md="6">
            <Modal
              isOpen={open}
              toggle={() => handleOpen(false)}
              className="modal-dept-container"
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  type="button"
                  onClick={() => handleOpen(false)}
                >
                  <i className="now-ui-icons ui-1_simple-remove"></i>
                </button>
                <h4 className="title title-up">Công nợ chi tiết khách hàng</h4>
              </div>
              <div className="info-dept-container">
                <div className="info-customer-container">
                  <span>Mã khách hàng</span>
                  <span>Tên khách hàng</span>
                  <span>Thời gian</span>
                  <span>Dư nợ hiện tại</span>
                  <span>Ngày cập nhật cuối</span>
                </div>
                <div className="info-customer-container">
                  <span>01</span>
                  <span>Nguyễn Tuấn Hải</span>
                  <span>01/01/2020 - 08/06/2020</span>
                  <span>40.000.000 VNĐ</span>
                  <span>07/06/2020</span>
                </div>
              </div>
              <ModalBody>
                <DetailDeptTable
                  tableHeaderColor="primary"
                  tableHead={[
                    'Mã đơn hàng',
                    'Ngày đặt hàng',
                    'Tên sản phẩm',
                    'Giá trị',
                    'Đã thanh toán',
                    'Còn thiếu',
                  ]}
                  tableData={dept}
                />
              </ModalBody>
              <div className="modal-footer">
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

export default DetailDeptModal;

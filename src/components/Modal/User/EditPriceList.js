import React from 'react';
// react plugins that creates an input with a date picker
import { makeStyles } from '@material-ui/core/styles';
// reactstrap components
import { Button, Container, Modal, ModalBody, Row, Col } from 'reactstrap';
import Error from 'components/Alert/Error';
import Success from 'components/Alert/Success';
import Loading from 'components/Loading/Loading';
//material-ui-icons
import Visibility from '@material-ui/icons/Visibility';
// @material-ui/core components
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
// redux - actions
import { useSelector, useDispatch } from 'react-redux';
import { UserActions } from 'actions';
// constants
import { validateForm } from 'constants/validate';
import { isEmpty } from 'lodash';

import './style.css';

const useStyles = makeStyles(styles);

function EditPriceList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = props;
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState({});
  const updatePriceListForUserResult = useSelector(
    (state) => state.updatePriceListForUserResult
  );
  const updatePriceListLoading = useSelector(
    (state) => state.updatePriceListLoading
  );
  const [newPriceList, setNewPriceList] = React.useState({
    freight_charges_ls_fast_20: user.freight_charges_ls_fast_20,
    freight_charges_ls_slow_20: user.freight_charges_ls_slow_20,
    freight_charges_ls_fast_20_100: user.freight_charges_ls_fast_20_100,
    freight_charges_ls_slow_20_100: user.freight_charges_ls_slow_20_100,
    freight_charges_ls_fast_100: user.freight_charges_ls_fast_100,
    freight_charges_ls_slow_100: user.freight_charges_ls_slow_100,
    freight_charges_hn_fast_100: user.freight_charges_hn_fast_100,
    freight_charges_hn_slow_100: user.freight_charges_hn_slow_100,
    freight_charges_hcm_fast_100: user.freight_charges_hcm_fast_100,
    freight_charges_hcm_slow_100: user.freight_charges_hcm_slow_100,
    user_id: user.id,
    role: user.role,
  });
  const handleOpen = (status) => {
    setOpen(status);
  };

  const update = () => {
    const error = validateForm(newPriceList);
    if (isEmpty(error)) {
      dispatch(UserActions.updatePriceListForUser(newPriceList));
    }
    setErr(error);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setErr({});
    const { name, value } = event.target;
    setNewPriceList({ ...newPriceList, [name]: value });
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
                <h4 className="title title-up">Bảng giá cước vận chuyển</h4>
              </div>
              {err && err.price && (
                <Error mess={err.price} visible={err && err.price} />
              )}
              {updatePriceListForUserResult && (
                <Success
                  mess={'Cập nhật bảng giá thành công'}
                  visible={updatePriceListForUserResult}
                />
              )}
              {updatePriceListLoading && <Loading />}
              <ModalBody>
                <div className={classes.tableResponsive}>
                  <Table className={classes.table}>
                    <TableHead className={classes['primary' + 'TableHeader']}>
                      <tr>
                        <th className="border-tb">
                          <span>Tỉ giá / KG</span>
                        </th>
                        <th colspan="2" className="border-tb">
                          Lạng Sơn
                        </th>
                        <th colspan="2" className="border-tb">
                          Hà Nội
                        </th>
                        <th colspan="2" className="border-tb">
                          Hồ Chí Minh
                        </th>
                      </tr>
                    </TableHead>
                    <TableBody>
                      <tr>
                        <td className="border-tb"></td>
                        <td className="border-tb">Nhanh</td>
                        <td className="border-tb">Chậm</td>
                        <td className="border-tb">Nhanh</td>
                        <td className="border-tb">Chậm</td>
                        <td className="border-tb">Nhanh</td>
                        <td className="border-tb">Chậm</td>
                      </tr>
                      <tr>
                        <td className="border-tb">0 - 20KG</td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_ls_fast_20"
                            min="0"
                            value={newPriceList.freight_charges_ls_fast_20}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_ls_slow_20"
                            min="0"
                            value={newPriceList.freight_charges_ls_slow_20}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-tb">20 - 100 KG</td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_ls_fast_20_100"
                            min="0"
                            value={newPriceList.freight_charges_ls_fast_20_100}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_ls_slow_20_100"
                            min="0"
                            value={newPriceList.freight_charges_ls_slow_20_100}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-tb">Trên 100 KG</td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_ls_fast_100"
                            min="0"
                            value={newPriceList.freight_charges_ls_fast_100}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_ls_slow_100"
                            min="0"
                            value={newPriceList.freight_charges_ls_slow_100}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_hn_fast_100"
                            min="0"
                            value={newPriceList.freight_charges_hn_fast_100}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_hn_slow_100"
                            min="0"
                            value={newPriceList.freight_charges_hn_slow_100}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_hcm_fast_100"
                            min="0"
                            value={newPriceList.freight_charges_hcm_fast_100}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                        <td className="border-tb">
                          <input
                            type="number"
                            name="freight_charges_hcm_slow_100"
                            min="0"
                            value={newPriceList.freight_charges_hcm_slow_100}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      </tr>
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>

              <div className="modal-footer">
                <Button color="primary" type="button" onClick={() => update()}>
                  Cập nhập
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

export default EditPriceList;

import React from "react";
// react plugins that creates an input with a date picker
import { makeStyles } from "@material-ui/core/styles";
// reactstrap components
import {
  Button,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import Error from "components/Alert/Error"
import Success from "components/Alert/Success"
import Loading from "components/Loading/Loading"
//material-ui-icons
import Visibility from "@material-ui/icons/Visibility";
// @material-ui/core components
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { UserActions } from "actions"
// constants
import { validateForm } from "constants/validate"
import { isEmpty } from "lodash"


const useStyles = makeStyles(styles);

function EditPriceList(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { user } = props
  const [open, setOpen] = React.useState(false)
  const [err, setErr] = React.useState({})
  const updatePriceListForUserResult = useSelector(state => state.updatePriceListForUserResult)
  const updatePriceListLoading = useSelector(state => state.updatePriceListLoading)
  const [newPriceList, setNewPriceList] = React.useState({
    price1: user.price1,
    price2: user.price2,
    price3: user.price3,
    price4: user.price4,
    user_id: user.id,
    role: user.role,
  })
  const handleOpen = (status) => {
    setOpen(status)
  }

  const update = () => {
    const error = validateForm(newPriceList)
    if (isEmpty(error)) {
      dispatch(UserActions.updatePriceListForUser(newPriceList))
    }
    setErr(error)
  }

  const handleChange = (event) => {
    event.preventDefault();
    setErr({})
    const {name, value} = event.target
    setNewPriceList({...newPriceList, [name]: value})
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
              <Modal isOpen={open} toggle={() => handleOpen(false)} className="modal-dept-container">
                <div className="modal-header justify-content-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => handleOpen(false)}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">Bảng giá áp dụng</h4>
                </div>
                {err && err.price && <Error mess={err.price} visible={err && err.price}/>}
                {updatePriceListForUserResult && <Success mess={"Cập nhật bảng giá thành công"} visible={updatePriceListForUserResult}/>}
                {updatePriceListLoading && <Loading />}
                <ModalBody>
                  <div className={classes.tableResponsive}>
                    <Table className={classes.table}>
                      <TableHead className={classes["primary" + "TableHeader"]}>
                        <TableRow className={classes.tableHeadRow}>
                          <TableCell
                            className={classes.tableCell + " " + classes.tableHeadCell}
                          >
                            0 - 10 KG
                          </TableCell>
                          <TableCell
                            className={classes.tableCell + " " + classes.tableHeadCell}
                          >
                            10 - 50 KG
                          </TableCell>
                          <TableCell
                            className={classes.tableCell + " " + classes.tableHeadCell}
                          >
                            50 - 100 KG
                          </TableCell>
                          <TableCell
                            className={classes.tableCell + " " + classes.tableHeadCell}
                          >
                            100 - 1000 KG
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow className={classes.tableBodyRow}>
                          <TableCell className={classes.tableCell}>
                            <input type="number" name="price1" min="0" value={newPriceList.price1} onChange={e => handleChange(e)}></input>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <input type="number" name="price2" min="0" value={newPriceList.price2} onChange={e => handleChange(e)}></input>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <input type="number" name="price3" min="0" value={newPriceList.price3} onChange={e => handleChange(e)}></input>
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            <input type="number" name="price4" min="0" value={newPriceList.price4} onChange={e => handleChange(e)}></input>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </ModalBody>
                
                <div className="modal-footer">
                  <Button color="primary" type="button" onClick={() => update()}>
                    Cập nhập
                  </Button>
                  <Button color="danger" type="button" onClick={() => handleOpen(false)}>
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

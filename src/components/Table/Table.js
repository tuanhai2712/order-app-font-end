import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import taskStyles from 'assets/jss/material-dashboard-react/components/tasksStyle.js';
import DetailOrderModal from 'components/Modal/DetailOrder/DetailOrderModal';
// @material-ui/icons
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
//reactstrap
import { Badge } from 'reactstrap';
// variables
import { statistic, colors, confirm } from 'constants/order.js';
//constants
import role from 'constants/role';
import moment from 'moment';
import regex from 'constants/regex';

// redux - actions
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from 'actions';
import { Spinner } from 'reactstrap';
const useStyles = makeStyles(styles);
const useTaskStyles = makeStyles(taskStyles);

export default function CustomTable(props) {
  const classes = useStyles();
  const taskClasses = useTaskStyles();
  const user = JSON.parse(localStorage.getItem('user'));
  const [confirmId, setConfirmId] = React.useState();
  const confirmOrderLoading = useSelector((state) => state.confirmOrderLoading);
  const { tableHead, tableData, tableHeaderColor } = props;
  const dispatch = useDispatch();
  const renderStatus = (status) => {
    return (
      <Badge style={{ backgroundColor: `${colors[status]}` }}>
        {statistic[status]}
      </Badge>
    );
  };

  const confirm = (status, orderId) => {
    setConfirmId(orderId);
    dispatch(
      OrderActions.confirm({
        tinh_trang: status + 1,
        id: orderId,
      })
    );
  };
  const renderConfirmOrder = (status, orderId) => {
    if (user.role === role.admin_role && status <= 5) {
      return (
        <Tooltip
          id="tooltip-top"
          title={'Xác nhận'}
          placement="top"
          classes={{ tooltip: taskClasses.tooltip }}
        >
          <IconButton
            aria-label="Confirm"
            className={taskClasses.tableActionButton}
            onClick={() => confirm(status, orderId)}
          >
            <Check
              className={
                taskClasses.tableActionButtonIcon + ' ' + taskClasses.confirm
              }
            />
          </IconButton>
        </Tooltip>
      );
    }
    return null;
  };

  const cancel = (orderId) => {
    setConfirmId(orderId);
    dispatch(
      OrderActions.confirm({
        tinh_trang: 7,
        id: orderId,
      })
    );
  };

  const renderCancelOrder = (status, orderId) => {
    if (status >= 2) {
      return null;
    }
    return (
      <Tooltip
        id="tooltip-top-start"
        title="Hủy đơn"
        placement="top"
        classes={{ tooltip: taskClasses.tooltip }}
      >
        <IconButton
          aria-label="Close"
          className={taskClasses.tableActionButton}
          onClick={() => cancel(orderId)}
        >
          <Close
            className={
              taskClasses.tableActionButtonIcon + ' ' + taskClasses.close
            }
          />
        </IconButton>
      </Tooltip>
    );
  };

  const renderPriceForMass = (item) => {
    const {
      store,
      chuyen_nhanh,
      khoi_luong,
      freight_charges_hcm_fast_100,
      freight_charges_hcm_slow_100,
      freight_charges_hn_fast_100,
      freight_charges_hn_slow_100,
      freight_charges_ls_fast_20,
      freight_charges_ls_fast_20_100,
      freight_charges_ls_fast_100,
      freight_charges_ls_slow_20,
      freight_charges_ls_slow_20_100,
      freight_charges_ls_slow_100,
    } = item;
    if (khoi_luong) {
      if (0 < khoi_luong <= 20) {
        if (chuyen_nhanh) {
          return khoi_luong * freight_charges_ls_slow_20;
        }
        return khoi_luong * freight_charges_ls_fast_20;
      } else if (20 < khoi_luong <= 100) {
        if (chuyen_nhanh) {
          return khoi_luong * freight_charges_ls_slow_20_100;
        }
        return khoi_luong * freight_charges_ls_fast_20_100;
      }
      if (chuyen_nhanh && store === 2) {
        return khoi_luong * freight_charges_hn_slow_100;
      }
      if (!chuyen_nhanh && store === 2) {
        return khoi_luong * freight_charges_hn_fast_100;
      }
      if (chuyen_nhanh && store === 3) {
        return khoi_luong * freight_charges_hcm_slow_100;
      }
      if (!chuyen_nhanh && store === 3) {
        return khoi_luong * freight_charges_hcm_fast_100;
      }
      if (chuyen_nhanh) {
        return khoi_luong & freight_charges_ls_fast_100;
      }
      return khoi_luong * freight_charges_ls_slow_100;
    }
  };

  const total = (item) => {
    const { gia_thuc_te, phi_ship_tq, phi_ship_vn, ty_gia } = item;
    const total =
      (parseInt(gia_thuc_te) * 1.03 + parseInt(phi_ship_tq)) *
        parseInt(ty_gia) +
      parseInt(phi_ship_vn) +
      renderPriceForMass(item);
    return Math.round(total / 1000) * 1000;
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
              <TableCell
                className={
                  classes.tableCell +
                  ' ' +
                  classes.tableHeadCell +
                  ' ' +
                  classes.tableSettingCell
                }
              >
                Tùy chỉnh
              </TableCell>
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell}>{prop.id}</TableCell>
                <TableCell className={classes.tableCell}>
                  {prop.ma_van_don}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {prop.ten_san_pham}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {`${prop.gia_thuc_te} RMB`}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {`${String(total(prop)).replace(regex.price, '$1.')} VNĐ`}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {moment(prop.created_at).format('DD/MM/YYYY HH:mm:ss')}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {confirmOrderLoading && confirmId === prop.id ? (
                    <Spinner />
                  ) : (
                    renderStatus(prop.tinh_trang)
                  )}
                </TableCell>
                <TableCell className={taskClasses.tableActions}>
                  <DetailOrderModal order={prop} />
                  {renderConfirmOrder(prop.tinh_trang, prop.id)}
                  {renderCancelOrder(prop.tinh_trang, prop.id)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
};

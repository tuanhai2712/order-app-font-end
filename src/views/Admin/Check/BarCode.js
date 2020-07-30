import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Loading from 'components/Loading/Loading';
import Success from 'components/Alert/Success';
import Error from 'components/Alert/Error';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
// marterial icon
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// react bar code
import BarcodeReader from 'react-barcode-reader';
// redux - actions
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions, SystemActions } from 'actions';
// lodash
import { isEmpty } from 'lodash';
// constants
import { validateForm } from 'constants/validate';
// style
import './style.css';

export default function BarCode() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orderBeingTransportedStatus);
  const loading = useSelector((state) => state.loading);
  const checkBarcodeResult = useSelector((state) => state.checkBarcodeResult);
  const customers = JSON.parse(localStorage.getItem('customers'));
  const [confirmedOrder, setConfirmedOrder] = useState([]);
  const [arrConsignment, setArrConsignment] = useState([]);
  const [waybillCode, setWaybillCode] = useState('');
  const [waybillCodeConsignment, setWaybillCodeConsignment] = useState('');
  const [err, setErr] = React.useState({});
  const [customer, setCustomer] = useState('');
  const [order, setOrder] = useState({
    ten_san_pham: '',
    ma_van_don: '',
    ma_don_hang: '',
    link_san_pham: '',
    khoi_luong: '',
    khach_hang: '',
  });

  React.useEffect(() => {
    dispatch(SystemActions.clear());
    dispatch(OrderActions.getOrderBeingTransportedStatus());
  }, []);

  const transfer = () => {
    if (!isEmpty(order)) {
      const error = validateForm(order);
      if (order.ma_van_don !== undefined) {
        if (isEmpty(order.ma_van_don)) {
          error.ma_van_don = 'Vui lòng quét mã vạch đơn hàng';
        }
      }
      if (isEmpty(error)) {
        const findOrderConfirmed = confirmedOrder.find(
          (i, k) => i.ma_van_don === order.ma_van_don
        );
        if (isEmpty(findOrderConfirmed)) {
          confirmedOrder.push({
            ma_van_don: order.ma_van_don,
            khoi_luong: order.khoi_luong,
          });
          setConfirmedOrder(confirmedOrder);
          confirmedOrder.map((i, k) => {
            if (isEmpty(waybillCode)) {
              return setWaybillCode(`${i.ma_van_don},`);
            }
            return setWaybillCode(`${waybillCode} ${i.ma_van_don},`);
          });
        }
      }
      setErr(error);
    }
  };

  const handleScan = (code) => {
    const { orders, consignment } = data;
    setErr({});
    setOrder({});
    setCustomer('');
    const findOrderWithWaybillCode = orders.find(
      (i, k) => i.ma_van_don === code
    );
    const findConsignmentWithWaybillCode = consignment.find(
      (i, k) => i.ma_van_don === code
    );
    if (!isEmpty(findOrderWithWaybillCode)) {
      const findCustomer = customers.find(
        (i, k) => i.id === parseInt(findOrderWithWaybillCode.user_id)
      );
      setOrder(findOrderWithWaybillCode);
      setCustomer(
        `${findCustomer.name} - ${findCustomer.address} - ${findCustomer.phone_number}`
      );
    }
    if (!isEmpty(findConsignmentWithWaybillCode)) {
      let arr = arrConsignment;
      if (
        !arr.find(
          (element) => element === findConsignmentWithWaybillCode.ma_van_don
        )
      ) {
        arr.push(findConsignmentWithWaybillCode.ma_van_don);
        setArrConsignment(arr);
        if (!waybillCodeConsignment.length) {
          setWaybillCodeConsignment(
            `${findConsignmentWithWaybillCode.ma_van_don},`
          );
        } else {
          setWaybillCodeConsignment(
            `${waybillCodeConsignment} ${findConsignmentWithWaybillCode.ma_van_don},`
          );
        }
      }
    }
    if (
      isEmpty(findConsignmentWithWaybillCode) &&
      isEmpty(findOrderWithWaybillCode)
    ) {
      setErr({
        ...err,
        ['not_found']: `Không tìm thấy đơn hàng với mã ${code}`,
      });
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setOrder({ ...order, [name]: parseInt(value) });
  };

  const checkBarcode = () => {
    if (!confirmedOrder.length && !arrConsignment.length) {
      return;
    }
    const data = {
      confirmedOrder,
      arrConsignment,
    };
    dispatch(SystemActions.clear());
    dispatch(OrderActions.checkBarcode(data));
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <BarcodeReader onScan={(code) => handleScan(code)} />
        <div className="check-container">
          {checkBarcodeResult && (
            <Success
              mess={'Check đơn thành công'}
              visible={checkBarcodeResult}
            />
          )}
          {err && err.ma_van_don ? (
            <Error mess={err.ma_van_don} visible={err && err.ma_van_don} />
          ) : null}
          {err && err.khoi_luong ? (
            <Error mess={err.khoi_luong} visible={err && err.khoi_luong} />
          ) : null}
          {err && err.not_found ? (
            <Error mess={err.not_found} visible={err && err.not_found} />
          ) : null}
          <Card>
            <CardHeader color="primary">
              <h4 className="card-title-white">Hàng đặt</h4>
              <span>{`Số lượng: ${confirmedOrder.length}`}</span>
            </CardHeader>
            <CardBody>
              <div className="check-bar-code-container">
                {loading && <Loading />}
                <div className="info-order-container">
                  <table className="table-info-order">
                    <tbody>
                      <tr>
                        <td className="field">Mã đơn hàng:</td>
                        <td className="content">{order.id}</td>
                      </tr>
                      <tr>
                        <td className="field">Mã vận đơn:</td>
                        <td className="content">{order.ma_van_don}</td>
                      </tr>
                      <tr>
                        <td className="field">Tên sản phẩm:</td>
                        <td className="content">{order.ten_san_pham}</td>
                      </tr>
                      <tr>
                        <td className="field">Link sản phẩm:</td>
                        <td className="content">{order.link_san_pham}</td>
                      </tr>
                      <tr>
                        <td className="field">Khối lượng:</td>
                        <td className="content">
                          <Input
                            type="number"
                            name="khoi_luong"
                            placeholder="Nhập khối lượng sản phẩm"
                            value={order.khoi_luong}
                            onChange={(e) => handleChange(e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="field">Khách hàng:</td>
                        <td className="content">{customer}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="button-transfer">
                  <Button color="info" size="sm" onClick={() => transfer()}>
                    <ChevronRightIcon />
                  </Button>
                </div>
                <div className="checked-order-container">
                  <Input type="textarea" disabled value={waybillCode} />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader color="primary">
              <h4 className="card-title-white">Hàng ký gửi</h4>
              <span>{`Số lượng: ${arrConsignment.length}`}</span>
            </CardHeader>
            <CardBody>
              <Input type="textarea" disabled value={waybillCodeConsignment} />
            </CardBody>
          </Card>
          <Button color="info" onClick={() => checkBarcode()}>
            Xác nhận
          </Button>
        </div>
      </GridItem>
    </GridContainer>
  );
}

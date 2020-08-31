import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'components/CustomButtons/Button.js';
import Datetime from 'react-datetime';
import { FormGroup, Input } from 'reactstrap';
import FilterInput from './FilterInput';
import { statistic } from 'constants/order';
import moment from 'moment';
// redux - actions
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from 'actions';
// constants
import { validateForm } from 'constants/validate';
import role from 'constants/role';
import { isEmpty } from 'lodash';

const styles = makeStyles((theme) => ({
  root: {
    boxShadow: 'unset',
    backgroundColor: 'unset',
    marginLeft: 15,
    '& .MuiFormControlLabel-label': {
      fontWeight: 300,
      fontSize: 13,
    },
    '& .MuiExpansionPanelSummary-root': {
      padding: 0,
      marginRight: 15,
    },
    '& .MuiExpansionPanel-root': {
      boxShadow: 'none',
    },
    '& .MuiExpansionPanelDetails-root': {
      display: 'block',
      padding: 0,
    },
  },
  field: {
    flex: 1,
    display: 'flex',
  },

  radioGroup: {
    flexDirection: 'column',
  },
}));

export default function Filter() {
  const classes = styles();
  const dispatch = useDispatch();
  const [conditions, setConditions] = React.useState(
    useSelector((state) => state.filterConditions)
  );
  const [err, setErr] = React.useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  const handleChangeTime = (value, name) => {
    setConditions({
      ...conditions,
      [name]: moment(value).format('DD-MM-YYYY'),
    });
  };
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setConditions({ ...conditions, [name]: parseInt(value) });
  };
  const search = () => {
    conditions.page = 1;
    const error = validateForm(conditions);
    if (isEmpty(error)) {
      dispatch(OrderActions.search(conditions));
    }
    setErr(error);
  };
  const selectCustomer = (customerId) => {
    setConditions({ ...conditions, ['customer_id']: customerId });
  };
  return (
    <Paper component="form" className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <span className="search-text">Tìm kiếm</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid xs={12} lg={2} sm={6} md={6} item>
              <div className="filter-container">
                <FormGroup>
                  <span>Từ ngày</span>
                  <Datetime
                    name="tu_ngay"
                    value={conditions.tu_ngay}
                    timeFormat={false}
                    inputProps={{ placeholder: 'Từ ngày' }}
                    className="date"
                    onChange={(value) => handleChangeTime(value, 'tu_ngay')}
                  />
                  {err && err.tu_ngay && (
                    <p className="err-mess">{err.tu_ngay}</p>
                  )}
                </FormGroup>
                <FormGroup>
                  <span>Đến ngày</span>
                  <Datetime
                    name="den_ngay"
                    value={conditions.den_ngay}
                    timeFormat={false}
                    inputProps={{ placeholder: 'Đến ngày' }}
                    className="date"
                    onChange={(value) => handleChangeTime(value, 'den_ngay')}
                  />
                  {err && err.den_ngay && (
                    <p className="err-mess">{err.den_ngay}</p>
                  )}
                </FormGroup>
              </div>
            </Grid>
            <Grid xs={12} lg={2} sm={6} md={6} item>
              <FormGroup className="form-group-filter">
                <span>Mã vận đơn</span>
                <Input
                  defaultValue=""
                  placeholder="Mã vận đơn"
                  type="text"
                  className="mt-10"
                  onChange={(e) => handleChange(e)}
                  name="ma_van_don"
                ></Input>
              </FormGroup>
            </Grid>
            <Grid xs={12} lg={2} sm={6} md={6} item>
              <FormGroup className="form-group-filter">
                <span>ID Đơn hàng</span>
                <Input
                  defaultValue=""
                  placeholder="ID Đơn hàng"
                  type="text"
                  className="mt-10"
                  onChange={(e) => handleChange(e)}
                  name="order_id"
                ></Input>
              </FormGroup>
            </Grid>

            {user.role === role.admin_role && (
              <Grid xs={12} lg={2} sm={6} md={6} item className="pr-10">
                <FilterInput
                  selectCustomer={(customerId) => selectCustomer(customerId)}
                />
              </Grid>
            )}
            <Grid xs={12} lg={2} sm={6} md={6} item>
              <FormGroup className="form-group-filter">
                <span>Tình trạng</span>
                <Input
                  type="select"
                  name="tinh_trang"
                  id="exampleSelect"
                  className="input-select-filter"
                  onChange={(e) => handleChange(e)}
                >
                  <option value={8}>Tất cả</option>
                  {statistic.map((i, k) => {
                    return (
                      <option key={k} value={k}>
                        {i}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Grid>
          </Grid>
          <Button color="primary" onClick={search}>
            Tìm kiếm
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
}

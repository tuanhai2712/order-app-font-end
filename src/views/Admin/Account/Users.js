import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import UserTable from "components/Table/UserTable.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Loading from "components/Loading/Loading"
import UserFilter from "components/Filter/UserFilter.js";
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { UserActions } from "actions"


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Users() {
  const classes = useStyles();
  const conditions = useSelector(state => state.userFilterConditions)
  const users = useSelector(state => state.users)
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(UserActions.getUsers(conditions))
  }, []);
  
  const changePage = (event, value) => {
    Object.assign(conditions, {page: value})
    dispatch(UserActions.pagination(conditions))
  }

  const renderContent = () => {
    if (loading) {
      return <Loading />
    }
    if (!loading && users.data && !users.data.length) {
      return <span>Không có dữ liệu</span>
    }
    return (
      <UserTable
        tableHeaderColor="primary"
        tableHead={["ID", "Tên khách hàng", "Email", "Số điện thoại", "Địa chỉ", "Ngày đăng ký", "Cập nhật cuối"]}
        tableData={users.data || []}
      />
    )
  }
  const renderPagination = () => {
    if (users.data && users.data.length) {
      return (
        <div className="pagination">
          <Pagination count={users.last_page} color="primary" page={conditions.page} onChange={(event, value) => changePage(event, value)}/>
        </div>
      )
    }
    return null
  }
  return (
    <GridContainer> 
      <GridItem xs={12} sm={12} md={12}>
        <UserFilter />
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Tài khoản</h4>
          </CardHeader>
          <CardBody>
          {renderContent()}
          {renderPagination()}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

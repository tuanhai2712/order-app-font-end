import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DateRange from "@material-ui/icons/DateRange";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Overview() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"))
  const overview = JSON.parse(localStorage.getItem("overview"))
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <ShoppingCart />
              </CardIcon>
              <p className={classes.cardCategory}>Đơn hàng mới</p>
              <h3 className={classes.cardTitle}>{overview.newOrder}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Trong 24 giờ qua
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Đơn hàng chờ xử lý</p>
              <h3 className={classes.cardTitle}>{overview.pendingOrder}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Tất cả
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <AttachMoneyIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Đơn hàng xong</p>
              <h3 className={classes.cardTitle}>
                {overview.successOrder}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Tất cả
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {user.role === 999 ?
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Tài khoản đăng ký</p>
                <h3 className={classes.cardTitle}>{overview.totalUser}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Tất cả
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          : null
        }
      </GridContainer>
    </div>
  );
}

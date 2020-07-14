import React from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import DeptTable from "components/Table/DeptTable.js";
import FilterInput from "components/Filter/FilterInput.js";
import Datetime from "react-datetime";
//style
import "./style.css"
import { dept } from "variables/dept.js";

export default function Debt() {
  return (
    <div className="debt-container">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridItem xs={12} sm={6} md={3}>
          <span>Từ</span>
            <Datetime
              timeFormat={false}
            />
            <span>Đến</span>
            <Datetime
              timeFormat={false}
            />
            <FilterInput />
            <Button color="primary" size="sm">Tìm kiếm</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <DeptTable
              tableHeaderColor="primary"
              tableHead={["ID", "Tên khách hàng", "Công nợ"]}
              tableData={dept}
            />
          </GridItem>
        </GridItem>
      </GridContainer>
    </div>
  );
}

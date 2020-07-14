import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import taskStyles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import DetailDeptModal from "components/Modal/DetailDept/DetailDeptModal";
//reactstrap
const useStyles = makeStyles(styles);
const useTaskStyles = makeStyles(taskStyles);

export default function DetailDeptTable(props) {
  const classes = useStyles();
  const taskClasses = useTaskStyles();
  const { tableHead, tableData, tableHeaderColor } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell}>
                  {prop.id}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {prop.ten_khach_hang}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {`${prop.cong_no} VNĐ`}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}

DetailDeptTable.defaultProps = {
  tableHeaderColor: "gray"
};

DetailDeptTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
};

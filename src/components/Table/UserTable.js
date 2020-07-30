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
import EditPriceList from "components/Modal/User/EditPriceList";
import moment from "moment"
//reactstrap
const useStyles = makeStyles(styles);
const useTaskStyles = makeStyles(taskStyles);

export default function UserTable(props) {
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
              <TableCell
                className={classes.tableCell + " " + classes.tableHeadCell + " " + classes.tableSettingCell }
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
                <TableCell className={classes.tableCell}>
                  {prop.id}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {prop.name}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {prop.email}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {`${prop.phone_number}`}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {prop.address}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {moment(prop.created_at).format('DD/MM/YYYY HH:mm:ss')}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {prop.updated_at ? moment(prop.updated_at).format('DD/MM/YYYY HH:mm:ss') : null}
                </TableCell>
                <TableCell className={taskClasses.tableActions}>
                  <EditPriceList user={prop}/>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}

UserTable.defaultProps = {
  tableHeaderColor: "gray"
};

UserTable.propTypes = {
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

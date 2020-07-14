import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "components/CustomButtons/Button.js";
import {
  FormGroup,
  Input,
} from "reactstrap";
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { UserActions } from "actions"

const styles = makeStyles(theme => ({
  root: {
    boxShadow: 'unset',
    backgroundColor: 'unset',
    marginLeft: 15,
    "& .MuiFormControlLabel-label": {
      fontWeight: 300,
      fontSize: 13
    },
    "& .MuiExpansionPanelSummary-root": {
      padding: 0,
      marginRight: 15
    },
    "& .MuiExpansionPanel-root": {
      boxShadow: "none",
    },
    "& .MuiExpansionPanelDetails-root": {
      display: "block",
      padding: 0
    },
  },
  field: {
    flex: 1,
    display: "flex"
  },

  radioGroup: {
    flexDirection: 'column'
  },
}))



export default function UserFilter() {
  const classes = styles()
  const dispatch = useDispatch()
  const [conditions, setConditions] = React.useState(useSelector(state => state.userFilterConditions))
  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setConditions({...conditions, [name]: value})
  }
  const search = () => {
    conditions.page = 1
    dispatch(UserActions.search(conditions))
  }
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
            <Grid xs={12} lg={3} sm={6} md={6} item>
              <FormGroup className="form-group-filter">
                <span>Tên khách hàng</span>
                <Input
                  defaultValue=""
                  placeholder="Tên khách hàng"
                  type="text"
                  className="mt-10"
                  onChange={e => handleChange(e)}
                  name="name"
                ></Input>
              </FormGroup>
            </Grid>
            <Grid xs={12} lg={3} sm={6} md={6} item>
              <FormGroup className="form-group-filter">
                <span>Số điện thoại</span>
                <Input
                  defaultValue=""
                  placeholder="Số điện thoại"
                  type="text"
                  className="mt-10"
                  onChange={e => handleChange(e)}
                  name="phone_number"
                ></Input>
              </FormGroup>
            </Grid>
          </Grid>
          <Button color="primary" onClick={search}>Tìm kiếm</Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  )
}
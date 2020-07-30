import React from "react";
// react plugins that creates an input with a date picker
import {
  Input,
} from "reactstrap";
//material-ui-core
import Divider from '@material-ui/core/Divider';

//search result
import FilterResults from 'react-filter-search';

function FilterInput(props) {
  const [value, setValue] = React.useState("")
  const customers = JSON.parse(localStorage.getItem("customers"))

  React.useEffect(() => {
    const { selected, customerId } = props
    if (selected && customerId) {
      const find = customers.find((i, k) => (i.id === parseInt(customerId)))
      setValue(`${find.name} - ${find.address} - ${find.phone_number}`)
    }
  }, [])
  const handleChange = event => {
    if (!event.target.value) {
      props.selectCustomer(null)
    }
    setValue(event.target.value)
  }

  const chooseCustomer = result => {
    setValue(`${result.name} - ${result.address} - ${result.phone_number}`)
    props.selectCustomer(result.id)
  }
  return (
    <>
      <span>Khách hàng</span>
      <Input disabled={props.disabled} autoComplete="off" className="filter-input" type="text" name="customer_id" value={value} onChange={e => handleChange(e)} placeholder="Tìm kiếm thông tin khách hàng" />
      <FilterResults
        value={value}
        data={customers}
        renderResults={results => {
          if (!value) {
            return null
          } 
          return (results.map(result => (
            <button className="button-select-result" key={result.id} onClick={() => chooseCustomer(result)}>
              <span>{result.name} - </span>
              <span>{result.address} - </span>
              <span>{`${result.phone_number}`}</span>
              <Divider />
            </button>
          )))
        }}
      />
    </>
  );
}

export default FilterInput;

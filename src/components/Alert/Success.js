/*eslint-disable*/
import React from "react";
import { Alert } from 'reactstrap';
import "./style.css"
function Success(props) {
  const [visible, setVisible] = React.useState(props.visible);
  const onDismiss = () => setVisible(false);
  React.useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 5000)
  }, [])
  return (
    <Alert color="success" isOpen={visible} toggle={onDismiss} className="alert-container success-alert">
      <span>{props.mess}</span>
    </Alert>
  );
}

export default Success;
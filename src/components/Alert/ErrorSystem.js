/*eslint-disable*/
import React from "react";
import { Alert } from 'reactstrap';
import "./style.css"
function ErrorSystem() {
  const [visible, setVisible] = React.useState(true);
  const onDismiss = () => setVisible(false);
  React.useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 5000)
  }, [])
  return (
    <Alert color="primary" isOpen={visible} toggle={onDismiss} className="alert-container">
      <span>Có lỗi trong quá trình xử lý, vui lòng liên hệ với quản trị!</span>
    </Alert>
  );
}

export default ErrorSystem;

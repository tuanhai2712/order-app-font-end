import React from "react";
import "./style.css"
import { Spinner } from 'reactstrap';
function Loading() {
  return (
    <div className="loading">
      <Spinner />
    </div>
  );
}

export default Loading;

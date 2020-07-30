import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup
} from "reactstrap";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import "./style.css"
// core components
import FileUpload from "components/FileUpload/FileUpload.js";
import Success from "components/Alert/Success"
import Error from "components/Alert/Error"
import Loading from "components/Loading/Loading"
import api from "constants/api";
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { OrderActions } from "actions"

export default function ImportListConsignment() {
  const dispatch = useDispatch()
  const importWaybillCodeResult = useSelector(state => state.importWaybillCodeResult)
  const loading = useSelector(state => state.loading)
  const [file, setFile] = useState()
  const [type, setType] = useState(0)
  const [errorFileType, setErrorFIleType] = useState(false)
  const [importResult, setImportResult] = useState({})

  React.useEffect(() => {
    setImportResult(importWaybillCodeResult)
  }, [importWaybillCodeResult])

  const getFile = (file) => {
    if (file) {
      setFile(file)
      setErrorFIleType(false)
    } else {
      setErrorFIleType(true)
    }
  }

  const selectType = (type) => {
    setType(type)
  }
  const importFile = () => {
    if (file) {
      dispatch(OrderActions.importWaybillCode({ file, type }))
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div className="import-container">
          {importResult.code === api.HTTP_OK ? <Success mess={"Import mã vận đơn thành công"} visible={importResult.code === api.HTTP_OK}/> : null}
          {importResult.code === api.HTTP_ERROR ? <Error mess={importResult.error} visible={importResult.code === api.HTTP_ERROR}/> : null}
          {errorFileType ? <Error mess={"File không đúng định dạng"} visible={errorFileType}/> : null}
          <Form>
            <div className="radio-button-container">
              <input checked={type === 0} type="radio" value={0} className="radio-button" onClick={() => selectType(0)} />
              <span>Hàng về kho TQ</span>
              <input checked={type === 1} type="radio" value={1} className="radio-button" onClick={() => selectType(1)}/>
              <span>Hàng về kho VN</span>
              <input checked={type === 2} type="radio" value={2} className="radio-button" onClick={() => selectType(2)}/>
              <span>Hàng đã giao</span>
            </div>
            {loading && <Loading />}
            <FileUpload
              getFile={file => getFile(file)}
            />
            
          </Form>
          <Button color="warning" type="button" onClick={() => importFile()}>
            Nhập đơn
          </Button>
        </div>
      </GridItem>
    </GridContainer>
  );
}

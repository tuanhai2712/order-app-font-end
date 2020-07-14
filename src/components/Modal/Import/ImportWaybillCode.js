import React from "react";
// react plugins that creates an input with a date picker
import {
  Button,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  Form,
} from "reactstrap";
// core components
import FileUpload from "components/FileUpload/FileUpload.js";
import Success from "components/Alert/Success"
import Error from "components/Alert/Error"
import Loading from "components/Loading/Loading"
// redux - actions
import { useSelector, useDispatch } from "react-redux"
import { OrderActions, SystemActions } from "actions"
// constants
import api from "constants/api";
import regex from "constants/regex"

function ImportWaybillCode(props) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const importWaybillCodeResult = useSelector(state => state.importWaybillCodeResult)
  const loading = useSelector(state => state.loading)
  const [file, setFile] = React.useState()
  const [errorFileType, setErrorFIleType] = React.useState(false)
  const [importResult, setImportResult] = React.useState({})

  React.useEffect(() => {
    setImportResult(importWaybillCodeResult)
  }, [importWaybillCodeResult])

  const handleOpen = (status) => {
    setOpen(status)
    dispatch(SystemActions.clear())
  }
  const getFile = (file) => {
    if (regex.fileImport.test(file.name)) {
      setFile(file)
      setErrorFIleType(false)
    } else {
      setErrorFIleType(true)
    }
  }

  const importFile = () => {
    if (file) {
      dispatch(OrderActions.importWaybillCode(file))
    }
  }

  return (
      <div className="modal-container">
        <Button color="primary" type="button" onClick={() => handleOpen(true)}>
          Import mã vận đơn
        </Button>
        <Container>
          <Row id="modals">
            <Col md="6">
              <Modal isOpen={open} toggle={() => handleOpen(false)}>
                <div className="modal-header justify-content-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => handleOpen(false)}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">Import mã vận đơn</h4>
                </div>
                {importResult.code === api.HTTP_OK ? <Success mess={"Import mã vận đơn thành công"} visible={importResult.code === api.HTTP_OK}/> : null}
                {importResult.code === api.HTTP_ERROR ? <Error mess={importResult.error} visible={importResult.code === api.HTTP_ERROR}/> : null}
                {errorFileType ? <Error mess={"File không đúng định dạng"} visible={errorFileType}/> : null}
                <ModalBody>
                {loading && <Loading />}
                  <Form>
                    <FileUpload
                      getFile={file => getFile(file)}
                    />
                  </Form>
                </ModalBody>
                <div className="modal-footer">
                  <Button color="success" type="button" onClick={() => importFile()}>
                    Import
                  </Button>
                  <Button
                    color="danger"
                    type="button"
                    onClick={() => handleOpen(false)}
                  >
                    Đóng
                  </Button>
                </div>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default ImportWaybillCode;

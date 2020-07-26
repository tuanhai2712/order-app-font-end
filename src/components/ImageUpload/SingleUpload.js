import React from "react";
// reactstrap
import { Button } from 'reactstrap';
// material-icon
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// constants
import role from 'constants/role'
import regex from 'constants/regex'
// redux - actions
import { useDispatch } from "react-redux"
import { SettingActions } from "actions"
// styles
import "./style.css"

function SingleUpload(props) {
  const inputFile = React.createRef()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const changeBackground = () => {
    inputFile.current.click()
  }

  const getImage = (event) => {
    event.preventDefault()
    if (event.target.files[0]) {
      if (regex.img.test(event.target.files[0].name)) {
        dispatch(SettingActions.changeSetting({
          file: event.target.files[0],
          field: props.field
        }))
      }
      return
    }
    return
  }
  return (
    <>
      {user && user.role == role.admin_role &&
        <>
          <input
            ref={inputFile}
            type="file"
            className="page-header-input-file"
            onChange={event => getImage(event)}
          />
          <Button className="main-page-icon-photo" onClick={() => changeBackground()}>
            <PhotoCameraIcon />
          </Button>
        </>
      }
    </>
  );
}

export default SingleUpload;

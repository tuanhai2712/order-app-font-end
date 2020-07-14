import React from "react";
// core components
import SingleUpload from 'components/ImageUpload/SingleUpload'
import Loading from "components/Loading/Loading"
// redux-saga
import { useSelector } from "react-redux"
// constants
import api from "constants/api"
import "./style.css"

function MainPageHeader() {
  const changeSettingLoading = useSelector(state => state.changeSettingLoading)
  const settings = JSON.parse(localStorage.getItem("settings"))
  const img = settings && settings.header_img ? `${api.BASE_URL}${settings.header_img}` : require("assets/img/defaut.png")
  return (
    <>
      <div className="page-header page-header-size">
        <SingleUpload field="header_img" />
        {changeSettingLoading.status && changeSettingLoading.field === "header_img" ?
          <Loading />
        :
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + img + ")"
            }}
          />
        }
      </div>
    </>
  );
}

export default MainPageHeader;

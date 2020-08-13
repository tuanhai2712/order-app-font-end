import React from 'react';
import './style.css';

function MainPageHeader() {
  return (
    <>
      <div className="page-header page-header-size">
        <div
          className="page-header-image"
          style={{
            backgroundImage: 'url(' + require('assets/img/banner.jpg') + ')',
          }}
        />
      </div>
    </>
  );
}

export default MainPageHeader;

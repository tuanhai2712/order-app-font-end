import React from 'react';
// reactstrap components
import { Container } from 'reactstrap';
// constants
import role from 'constants/role';

function ProfilePageHeader() {
  let pageHeader = React.createRef();
  const user = JSON.parse(localStorage.getItem('user'));
  const overview = JSON.parse(localStorage.getItem('overview'));
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          'translate3d(0,' + windowScrollTop + 'px,0)';
      };
      window.addEventListener('scroll', updateScroll);
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: 'url(' + require('assets/img/banner.jpg') + ')',
          }}
          ref={pageHeader}
        ></div>
        <Container className="profile-page-header-image">
          <h3 className="title">{user.name}</h3>
          <p className="category">
            {user.role === role.admin_role ? 'Quản trị viên' : 'Thành viên'}
          </p>
          <div className="content">
            <div className="social-description">
              <h2>{overview.totalOrder}</h2>
              <p>Tổng đơn hàng</p>
            </div>
            <div className="social-description">
              <h2>{overview.successOrder}</h2>
              <p>Đã xong</p>
            </div>
            <div className="social-description">
              <h2>{overview.pendingOrder}</h2>
              <p>Đang chờ xử lý</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;

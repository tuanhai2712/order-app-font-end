/*eslint-disable*/
import React from 'react';

// reactstrap components
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
// core components
import ErrorSystem from 'components/Alert/ErrorSystem';
import api from 'constants/api';

function TransparentFooter() {
  const err = useSelector((state) => state.system_error);
  return (
    <footer className="footer">
      <Container>
        {err && <ErrorSystem />}
        <nav>
          <ul>
            <li>
              <a href={api.MAIN_URL}>Trang chủ</a>
            </li>
            <li>
              <a href={`${api.MAIN_URL}/ve-chung-toi`}>Về chúng tôi</a>
            </li>
            <li>
              <a
                href={`${api.MAIN_URL}/bieu-phi-thanh-toan`}
              >{`Biểu phí & Thanh toán`}</a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed and Coded by{' '}
          <a
            href="https://www.facebook.com/profile.php?id=100049427490089"
            target="_blank"
          >
            Tuấn Hải
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;

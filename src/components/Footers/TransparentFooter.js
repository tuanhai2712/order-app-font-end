/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import { useSelector } from "react-redux"
// core components
import ErrorSystem from "components/Alert/ErrorSystem"

function TransparentFooter() {
  const err = useSelector(state => state.system_error)
  return (
    <footer className="footer">
      <Container>
        {err && <ErrorSystem/>}
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed and Coded by{" "}
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

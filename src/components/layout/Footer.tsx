import FooterLogo from 'src/assets/images/main/footer_logo.png'
import { withRouter } from "react-router-dom";
import "./Footer.scss"
const Footer = withRouter(({ match, location }) => {
    const arr = ["/signUp", "/signUpComplete", "/play"]
    if (arr.indexOf(location.pathname) >= 0) {
        return null;
    }
    return (
        <footer>
            <img
                className="logo"
                src={FooterLogo}
                alt="EASYUP"
                title="EASYUP"
            />
            <div className="gnb">
                <span className="bar">|</span>

                <span className="bar">|</span>

            </div>
            <address>
                <pre>(주)유니윌<br />대표이사:조인형   주소:서울시 강남구 테헤란로124<br />사업자 등록번호:220-86-20171    통신판매업신고:강남 제3339호</pre>
            </address>
            <h2 className="supply_number">고객지원 support@easyupclass.com</h2>
        </footer>
    )
});
export default Footer
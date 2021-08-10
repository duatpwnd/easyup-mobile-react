import Logo from 'src/assets/images/main/logo.png'
import './Header.scoped.scss'
import MenuButton from 'src/assets/images/main/menu_btn.png'
import { Link } from "react-router-dom";
import { loginModal } from "src/util/index";
const Header = () => {
    return (<nav id="nav"
    >
        <button className="easyup-menu-btn" onClick={() => {
            loginModal({
                loginModal: true,
                mask: true
            });
        }}>
            <img src={MenuButton} alt="메뉴" title="메뉴" />
        </button>
        <Link to="/" className="easyup-logo"><img src={Logo} alt="이지업" title="이지업" /></Link>
    </nav>
    );
}
export default Header
import { useDispatch } from "react-redux";
import Logo from 'src/assets/images/main/logo.png'
import './Header.scss'
import MenuButton from 'src/assets/images/main/menu_btn.png'
import * as toggle from "src/action/toggle"
import { Link } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const menuToggle = (): void => {
        dispatch(toggle.loginModal());
    }
    return (<nav id="nav"
    >
        <button className="easyup-menu-btn" onClick={menuToggle}>
            <img src={MenuButton} alt="메뉴" title="메뉴" />
        </button>
        <Link to="/" className="easyup-logo"><img src={Logo} alt="이지업" title="이지업" /></Link>
    </nav>
    );
}
export default Header
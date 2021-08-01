import { Link } from "react-router-dom";
import "./Category.scss"
import Category1 from 'src/assets/images/main/main_category_ico1.png'
import Category2 from 'src/assets/images/main/main_category_ico2.png'
import Category3 from 'src/assets/images/main/main_category_ico3.png'
import Category4 from 'src/assets/images/main/main_category_ico4.png'
import Category5 from 'src/assets/images/main/main_category_ico5.png'
import Category6 from 'src/assets/images/main/main_category_ico6.png'
import Category7 from 'src/assets/images/main/main_category_ico7.png'
const Category = () => {
    return <div id="category">
        <div className="category-list">
            <Link to={{
                pathname: "/category",
                state: {
                    title: '코딩베이비',
                    category_code: 'INTRODUCTION',
                    action: 'get_course_list',
                    keyword: '',
                    pageCurrent: 1,
                    order: 'type_date',
                }
            }}>
                <img
                    className="lec1_ico"
                    src={Category1}
                    alt="코딩베이비"
                    title="코딩베이비"
                />
                <h3>코딩베이비</h3>
            </Link>
            <Link to={{
                pathname: "/category",
                state: {
                    title: '코딩언어',
                    category_code: 'LANGUAGE',
                    action: 'get_course_list',
                    keyword: '',
                    pageCurrent: 1,
                    order: 'type_date',
                }
            }}>
                <img
                    className="lec1_ico"
                    src={Category2}
                    alt="코딩언어"
                    title="코딩언어"
                />
                <h3>코딩언어</h3>
            </Link>
            <Link to={{
                pathname: "/category",
                state: {
                    title: '웹',
                    category_code: 'WEB',
                    action: 'get_course_list',
                    keyword: '',
                    pageCurrent: 1,
                    order: 'type_date',
                }
            }}>
                <img
                    className="lec3_ico"
                    src={Category3}
                    alt="웹"
                    title="웹"
                />
                <h3>웹</h3>
            </Link>
            <Link to={{
                pathname: "/category",
                state: {
                    title: '모바일·게임',
                    category_code: 'MOBILEGAME',
                    action: 'get_course_list',
                    keyword: '',
                    pageCurrent: 1,
                    order: 'type_date',
                }
            }}>
                <img
                    className="lec4_ico"
                    src={Category4}
                    alt="모바일·게임"
                    title="모바일·게임"
                />
                <h3>모바일·게임</h3>
            </Link>
        </div>
        <div className="category-list">

            <Link to={{
                pathname: "/category",
                state: {
                    title: 'DATASCIENCE',
                    category_code: 'PROGRAMMING',
                    action: 'get_course_list',
                    keyword: '',
                    pageCurrent: 1,
                    order: 'type_date',
                }
            }}>
                <img
                    className="lec1_ico"
                    src={Category4}
                    alt="데이터·AI"
                    title="데이터·AI"
                />
                <h3>데이터·AI</h3>
            </Link>
            <Link to={{
                pathname: "/category",
                state: {
                    title: '정보보안',
                    category_code: 'SECURITY',
                    action: 'get_course_list',
                    keyword: '',
                    pageCurrent: 1,
                    order: 'type_date',
                }
            }}>
                <img
                    className="lec2_ico"
                    src={Category5}
                    alt="정보보안"
                    title="정보보안"
                />
                <h3>정보보안</h3>
            </Link>
            <Link to={{
                pathname: "/category",
                state: {
                    title: '기초학세미나',
                    category_code: 'BASICS',
                    action: 'get_course_list',
                    keyword: '',
                    pageCurrent: 1,
                    order: 'type_date',
                }
            }}>
                <img
                    className="lec2_ico"
                    src={Category6}
                    alt="기초학세미나"
                    title="기초학세미나"
                />
                <h3>기초학세미나</h3>
            </Link>
            <Link to={{
                pathname: "/category",
                state: {
                    title: '커리어부스터',
                    category_code: 'CAREER',
                    action: 'get_course_list',
                    keyword: '',
                    pageCurrent: 1,
                    order: 'type_date',
                }
            }}>
                <img
                    className="lec2_ico"
                    src={Category7}
                    alt="커리어부스터"
                    title="커리어부스터"
                />
                <h3>커리어부스터</h3>
            </Link>
        </div>
    </div>

}
export default Category
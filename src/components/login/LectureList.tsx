import "./LectureList.scoped.scss"
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { loginModal } from "src/util/index";
const LectureList = (props) => {
    const [list, listUpdate] = useState<{ [key: string]: any }>({})
    const history = useHistory();
    const goToLectureList = (title, index) => {
        history.push({
            pathname: "/category",
            state: {
                title: title,
                category_code: index,
                action: 'get_course_list',
                keyword: '',
                pageCurrent: 1,
                order: 'type_date',
            }
        })
        loginModal({
            loginModal: false,
            mask: false
        });
    }
    const getCategoryList = () => {
        const data = {
            action: "get_category_list",
        };
        axios
            .post("", JSON.stringify(data))
            .then((result: { [key: string]: any }) => {
                listUpdate(result.data.data)
            });
    }
    useEffect(() => {
        getCategoryList()
    }, [])
    return (
        <div className="menu_modal">
            <h3 onClick={() => { props.eventHandler(false) }}><button className="back" ></button>이전 메뉴로 돌아가기</h3>
            <ul className="list">
                <li>
                    <span onClick={() => { goToLectureList('전체', 'ALL') }}>전체보기</span>
                </li>
                {Object.values(list).map((item, index) => <li key={item}><span onClick={() => goToLectureList(item, index)}>{item}</span></li>)}
            </ul>
        </div>
    )

}
export default LectureList
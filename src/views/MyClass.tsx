import MyClassGnb from "src/components/gnb/MyClassGnb"
import Store from "src/reducers/index"
import axios from 'axios';
import "./MyClass.scoped.scss"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
const UserProfile = ({ props }) => {
    const userInfo = useSelector((state: ReturnType<typeof Store>) => {
        return (state.userInfoSet.userInfo) as { [key: string]: any }
    })
    useEffect(() => {
    }, [])
    return (
        userInfo != null ? <div>
            <div className="user-info">
                <span
                    className="profile"
                    style={{
                        background: `url(${userInfo.profile_image}) no-repeat 
      center / 100% 100%`,
                    }}
                >
                </span>
                <div className="info">
                    <span className="name">{userInfo.username}님의 강의실</span>
                    <p className="email">
                        {userInfo.email}
                    </p>
                    {userInfo.status == 1 && <div>
                        <span className="report">프로필</span>
                        {userInfo.status == 1 ? <span className="convert">학생전환</span> :
                            <span className="convert">강사전환</span>
                        }
                    </div>}
                </div>
            </div>

        </div> : null
    )
};
const BoardList = ({ item }) => {
    console.log(item);
    return (
        <div className="tr">
            <Link className="td td1" to={{
                pathname: "/play",
                state: {
                    course_id: item.id,
                    lp_id: item.lp_id,
                }
            }}>{item.title}
            </Link>
            <span className="td_wrap">
                <span className="td date">{item.expired_on}</span>
            </span>
        </div>
    )
}
const MyClass = (props) => {
    console.log(props);
    const [dashboard, dashboardUpdate] = useState<{ [key: string]: any }>({});
    const getMyLecture = () => {
        axios.all([axios.post("", { action: "get_top_count" }),
        axios.post("", { action: "get_dashboard_list" })
        ]).then(axios.spread((result1, result2) => {
            console.log(result1, result2);
            dashboardUpdate({
                count: result1.data.data,
                list: result2.data.data
            })
        }))
    }
    useEffect(() => {
        getMyLecture();
    }, [])
    return (
        <div>
            <UserProfile props={props}></UserProfile>

            {dashboard.count != undefined && <ul className="course_info">
                <li>
                    <h3>진행중인 강의</h3>
                    <span>{dashboard.count.course.ing_count}건</span>
                </li>
                <li>
                    <h3>
                        진행중인 코스
                    </h3>
                    <span>{dashboard.count.session.ing_count}건</span>
                </li>
                <li>
                    <h3>
                        종료된 강의
                    </h3>
                    <span>{dashboard.count.course.end_count}건</span>
                </li>
                <li>
                    <h3>
                        종료된 코스
                    </h3>
                    <span>{dashboard.count.session.end_count}건</span>
                </li>
            </ul>
            }
            {dashboard.list != undefined && <div className="contents">
                <h2>현재 구독중인 강의</h2>
                {dashboard.list.ing_course.length == 0 && <span className="no_register">진행중인 강의가 없습니다.</span>
                }
                {dashboard.list.ing_course.map((item, index) => {
                    return <BoardList item={item} key={index}></BoardList>
                })}
            </div>}
            <MyClassGnb></MyClassGnb>
        </div>
    )
}
export default MyClass
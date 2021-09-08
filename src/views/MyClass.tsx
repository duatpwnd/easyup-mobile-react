import MyClassGnb from "src/components/gnb/MyClassGnb"
import Store from "src/reducers/index"
import axios from 'axios';
import "./MyClass.scoped.scss"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProgressBar from "src/components/common/ProgressBar";
import Pagination from "src/components/common/Pagination";
const TimeLine = ((props) => {
    const locationState = props.location;
    const [timeLineInfo, timeLineUpdate] = useState<{ [key: string]: any } | null>(null)
    console.log('타임라인@@@@@@@@@@', locationState, timeLineInfo);
    const getDashboardTimeline = (num: number) => {
        const obj = {
            action: "get_dashboard_timeline",
            current: num,
        }
        axios.post("", JSON.stringify(obj)).then((result) => {
            console.log('타임라인결과:', result);
            timeLineUpdate(result.data.data)
        })
    }
    useEffect(() => {
        getDashboardTimeline(1);
    }, [])
    return (
        <section className="timeLine">
            <h2 className="title">타임라인</h2>
            <Swiper
                slidesPerView={1}
            >
                {timeLineInfo != null ? timeLineInfo.list.map((item, index) =>
                    <SwiperSlide key={index} className="slide">
                        <h2>{item.login_date}</h2>
                        <img src={item.course_image} />
                        <p className="timeline_txt" dangerouslySetInnerHTML={{ __html: item.showTxt }}></p>
                    </SwiperSlide>
                ) : null}
            </Swiper>
            <Pagination to={{ pageCurrent: 1 }} total={timeLineInfo?.totalPage}></Pagination>
        </section>
    )
})
const UserProfile = ({ props }) => {
    console.log("유저프로필@@@@@@@@@@@2");
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
    console.log('게시판리스트@@@@@@@@@@@@@');
    return (
        <div className="tr subscribed_lec">
            <Link className="td td1" to={{
                pathname: "/play",
                state: {
                    course_id: item.id,
                    lp_id: item.lp_id,
                }
            }} dangerouslySetInnerHTML={{ __html: item.title == undefined ? item.session_name : item.title }}>
            </Link>
            <span className="td_wrap">
                <span className="td date">{item.expired_on}</span>
                {item.progress != undefined && <ProgressBar max={100} value={item.progress}>
                    <span className="percent">
                        {item.progress}%
                    </span>
                </ProgressBar>}
            </span>
        </div>
    )
}
const MyClass = (props) => {
    console.log('내강의실@@@@@@@@@@@@@');
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
                <h2>현재 구독중인 코스</h2>
                {dashboard.list.ing_session.length == 0 && <span className="no_register">진행중인 강의가 없습니다.</span>
                }
                {dashboard.list.ing_session.map((item, index) => {
                    return <BoardList item={item} key={index}></BoardList>
                })}
                <TimeLine></TimeLine>
            </div>}

            <MyClassGnb></MyClassGnb>
        </div>
    )
}
export default MyClass
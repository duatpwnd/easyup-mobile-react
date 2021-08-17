import { useEffect, useState, useMemo } from 'react';
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./LectureDetail.scoped.scss"
import Ratings from 'react-ratings-declarative';
import BaseButton from 'src/components/common/BaseButton';
import Store from "src/reducers/index"
const CurrList = ({ li, detail }) => {
    const [isActive, toggle] = useState(false);
    return (
        <div onClick={() => { toggle(!isActive) }}>
            <span className={`full-title ${li.children_count == null ? "" : "not-full-title"}`}>
                <span className="lec-title-section" dangerouslySetInnerHTML={{ __html: li.title }}></span>
                {/* 즉시실행함수
                    (function () {
                        실행 문장
                    })();
                */}
                {(() => {
                    if (li.up_status == 1 && detail.isApprove == 0) {
                        <span className="ing-ico">변환중</span>
                    } else if (li.up_status == 2 && detail.isApprove == 0) {
                        <span className="complete-ico">완료</span>
                    }
                })()}
            </span>
            {li.children_count != null && <span className="lec_num"> {li.children_count}개</span>}
            {/* 커리큘럼 하위리스트 */}
            {detail.curriculum_list.type == "section" &&
                isActive && <div className="child-list">
                    {li.children_list.map((child) =>
                        <div
                            className="child-list-title"
                            key={child.title}
                        >
                            <span className="child-title-section" dangerouslySetInnerHTML={{ __html: child.title }}></span>
                            <span
                                className="ing-ico"
                            >변환중</span
                            >
                            <span
                                className="complete-ico"
                            >완료</span
                            >
                        </div>
                    )}
                </div>
            }
        </div>
    )
};
const LectureDetail = ({ location }) => {
    console.log('리랜');
    const [detail, setDetail] = useState<{ [key: string]: any }>({})
    const [subsInfo, subsCheck] = useState({ isSubscribe: false, isPossibleReview: false });
    const userInfo = useSelector((state: ReturnType<typeof Store>) => {
        return (state.userInfoSet.userInfo) as { [key: string]: any }
    })
    // 구독 여부 조회
    const subscribeCheck = () => {
        const data = {
            action: "check_subscribe_course",
            course_id: location.state.id
        }
        axios
            .post("", JSON.stringify(data)).then((result) => {
                console.log(result);
                subsCheck(result.data.data)
            });
    }
    useEffect(() => {
        if (userInfo != null) {
            subscribeCheck();
        }
    }, [userInfo])

    useEffect(() => {
        const body = {
            action: "get_course_info",
            course_id: location.state.id
        }
        axios
            .post("", JSON.stringify(body))
            .then((result) => {
                console.log(result);
                setDetail(result.data.data)

            });
    }, [])
    if (detail.price != undefined) {
        return (
            <div>
                <img
                    alt="파이썬 코딩 기본편"
                    title="파이썬 코딩 기본편"
                    src={detail.course_image}
                />
                <div className="date-info">
                    <span
                    >{detail.creation_date}(업데이트 일자:{
                            detail.update_date
                        })</span
                    >
                </div>
                <section className="section1">
                    <div className="lecture-title">
                        <h3 className="subtitle" >{detail.category}</h3>
                        <h2 className="title">{detail.title}</h2>
                    </div>
                    <div className="star-rating">
                        <Ratings
                            rating={detail.ranking}
                            widgetDimensions="30px"
                            widgetSpacings="2px"
                            widgetEmptyColors="#ccc"
                        >
                            <Ratings.Widget widgetRatedColor="gold" />
                            <Ratings.Widget widgetRatedColor="gold" />
                            <Ratings.Widget widgetRatedColor="gold" />
                            <Ratings.Widget widgetRatedColor="gold" />
                            <Ratings.Widget widgetRatedColor="gold" />
                        </Ratings>
                    </div>
                    {detail.price.is_free ? <h2 className="free">무료</h2> :
                        <div className="price">
                            {detail.price.format_original != detail.price.format_final ? <del className="original">{detail.price.format_original}</del> : ""}
                            <span className="final">{detail.price.format_final}원</span>
                        </div>
                    }
                    <div id="tag_wrap">
                        <div className="tag_list">
                            {detail.tags.map((li, index) =>
                                <Link
                                    className="tag"
                                    key={index}
                                    to={{
                                        pathname: '/category',
                                        state: {
                                            action: 'get_course_list',
                                            pageCurrent: 1,
                                            order: 'type_date',
                                            keyword: '',
                                            tag: li.tag.replace('#', ''),
                                        },
                                    }}
                                >
                                    {li.tag}</Link
                                >
                            )}
                        </div>
                    </div>
                    <div id="subscribe">
                        <div>
                            <div className="subscribe_wrap">
                                {(() => {
                                    if (subsInfo.isSubscribe || (subsInfo.isSubscribe == false && detail.is_teacher)) {
                                        {/* 강의를 구매한경우  */ }
                                        return <BaseButton className="active_subscribe" name="강의 보러가기"></BaseButton>
                                    } else if (detail.price.is_free) {
                                        {/* 무료강의인경우 */ }
                                        return <BaseButton name="구매하기"></BaseButton>
                                    } else if (subsInfo.isSubscribe == false && detail.price.is_free == false) {
                                        console.log('여기다');
                                        {/* 강의 구매를 안한경우 */ }
                                        return <BaseButton name="구매하기"></BaseButton>
                                    }
                                }
                                )()}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section2">
                    <div className="user_intro">
                        <div className="teacher-profile-info">
                            <span className="name teacher-profile" style={{
                                background: `url(${detail.teachers.profile_image}) no-repeat center / 100% 100%`
                            }}></span>
                            <span className="teacher-name">{detail.teachers.name}</span>
                        </div>
                        <div>
                            <span className="access_limit">{detail.access_limit.basic}</span>
                        </div>
                        <div>
                            <span className="total_lec"
                            ><span className="color">
                                    {detail.curriculum_list.count_detail}</span
                                >개 레슨</span
                            >
                        </div>
                    </div>
                </section>
                <div id="intro">
                    {detail.description.map((li, index) =>
                        <div className="example" key={index}>
                            {li.underline ? <h2 className="title" dangerouslySetInnerHTML={{ __html: li.title }}></h2>
                                : <h2 dangerouslySetInnerHTML={{ __html: li.title }}></h2>}
                            <div className="description_contents" dangerouslySetInnerHTML={{ __html: li.content }}></div>
                        </div>
                    )}
                </div>
                {/* 커리큘럼 */}
                <div className="curriculum">
                    <div className="curriculum_header">
                        <h2 className="curriculum_title">커리큘럼</h2>
                        <span className="total_lec"
                        >{detail.curriculum_list.count_detail}개 레슨</span
                        >
                    </div>
                    <div className="curriculum_list">
                        {detail.curriculum_list.items.map((li, index) =>
                            <CurrList li={li} detail={detail} key={index} />
                        )}
                    </div>
                </div>
                <div className="teacher-intro">
                    <h2 className="teacher-intro-title">강사소개</h2>
                    <div
                        className="teacher-intro-contents"
                        dangerouslySetInnerHTML={{ __html: detail.teachers.profile_info }}
                    ></div>
                </div>
            </div>
        )
    } else {
        return null
    }

}
export default LectureDetail

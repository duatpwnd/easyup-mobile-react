import { useEffect, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./LectureDetail.scoped.scss"
import Ratings from 'react-ratings-declarative';
const LectureDetail = ({ location }) => {
    const [detail, setDetail] = useState<{ [key: string]: any }>({})
    const body = {
        action: "get_course_info",
        course_id: location.state.id
    }
    const CurrList = ({ li }) => {
        const [isActive, toggle] = useState(false);
        return (
            <div key={li.title} onClick={() => { toggle(!isActive) }}>
                <span className={`full-title ${li.children_count == null ? "" : "not-full-title"}`}>
                    <span className="lec-title-section" dangerouslySetInnerHTML={{ __html: li.title }}></span>
                    {() => {
                        if (li.up_status == 1 && detail.isApprove == 0) {
                            <span className="ing-ico">변환중</span>
                        } else if (li.up_status == 2 && detail.isApprove == 0) {
                            <span className="complete-ico">완료</span>
                        }
                    }}
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
    }
    useEffect(() => {
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
                <div className="update-noti">
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
                            <CurrList li={li} key={index}></CurrList>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }

}
export default LectureDetail

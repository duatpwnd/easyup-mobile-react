import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./LectureDetail.scss"
import Ratings from 'react-ratings-declarative';
const LectureDetail = ({ location }) => {
    const [detail, setDetail] = useState<{ [key: string]: any }>({})
    const body = {
        action: "get_course_info",
        course_id: location.state.id
    }
    useEffect(() => {
        axios
            .post("", JSON.stringify(body))
            .then((result) => {
                console.log(result);
                setDetail(result.data.data)
            });
    }, [])
    if (Object.keys(detail).length > 0) {
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
                </section>
            </div >
        )
    } else {
        return null
    }

}
export default LectureDetail

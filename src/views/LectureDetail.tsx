import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from 'axios';
import "./LectureDetail.scss"
import Ratings from 'react-ratings-declarative';
const LectureDetail = ({ location }) => {
    const [detail, setDetail] = useState<{ [key: string]: any }>({})
    const query = queryString.parse(location.search);
    const body = {
        action: "get_course_info",
        course_id: query.id
    }
    useEffect(() => {
        console.log('useEffect');
        axios
            .post("", JSON.stringify(body))
            .then((result) => {
                console.log(result);
                setDetail(result.data.data)
            });
    }, [])
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
            </section>
        </div >
    )
}
export default LectureDetail

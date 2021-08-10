import "./LectureList.scoped.scss"
import axios from "axios";
import Pagination from "src/components/common/Pagination";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
const LectureList = (props: { [key: string]: any }) => {
    const locationState = props.location.state;
    const [listInfo, listUpdate] = useState<{ [key: string]: any }>({})
    const history = useHistory();
    const detail = (id) => {
        history.push({
            pathname: locationState.action == "get_course_list" ? "/lectureDetail" : "courseDetail",
            state: {
                id: id
            }
        })
    }
    const getLectureList = (current, order, keyword) => {
        console.log('호출');
        const data = {
            action: locationState.action,
            current: current,
            order: order,
            keyword: keyword,
            category_code: locationState.category_code
                ? locationState.category_code
                : null,
            tag: locationState.tag,
        };
        axios
            .post("", JSON.stringify(data))
            .then((result) => {
                console.log(result);
                listUpdate(result.data.data)
            });
    }
    useEffect(() => {
        getLectureList(locationState.pageCurrent, locationState.order, locationState.keyword)
    }, [locationState])
    return (
        <div className="wrap">
            <div className="breadcrumb">
                {locationState.title || locationState.tag ? <span>강의 &gt; {locationState.title}{locationState.tag}</span>
                    :
                    <span>강의 &gt; 전체</span>
                }
            </div>
            <h2 className="total">
                전체 검색 총<span className="count">{listInfo.total_count}</span
                >건
            </h2>
            {listInfo.list != undefined ? <div className="list-wrap">
                {
                    listInfo.list.map((li, index) =>
                        <div className="li" onClick={() => { detail(li.id) }}>
                            <span className="thumb" >
                                <img src={li.thumbnail} />
                            </span>
                            <h4 >{li.teacher}</h4>
                            <h2 className="subtitle">{li.title}</h2>
                            <div className="evaluate">
                                <span className="score">{li.rating}</span>
                                {
                                    li.price.is_free
                                        ?
                                        <h1 className="free">FREE</h1>
                                        :
                                        <span className="price" >
                                            {li.price.format_original != li.price.format_final ? <del className="original">{li.price.format_original}</del> : ""}
                                            <span className="final">{li.price.format_final}</span>
                                        </span>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
                : ""}
            <Pagination to={{
                title: '전체',
                category_code: 'ALL',
                action: 'get_course_list',
                keyword: '',
                pageCurrent: locationState.pageCurrent,
                order: 'type_date'
            }} total={listInfo.total_page}></Pagination>
        </div >
    )

}
export default LectureList
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BaseSearchInput from "src/components/common/BaseSearchInput";
import Pagination from "src/components/common/Pagination";
import "./NoticeList.scoped.scss"
const NoticeList = ({ match, location }) => {
    const locationState = location.state
    console.log(locationState);
    const [list, listUpdate] = useState<{ [key: string]: any }>({})

    useEffect(() => {
        console.log('use');
        const data = {
            action: "get_cs_list", //필수
            current: locationState == null ? 1 : locationState.pageCurrent, //필수
            type: "notice",
            keyword: "", //옵션
        };
        axios
            .post("", JSON.stringify(data))
            .then((result) => {
                console.log(result);
                listUpdate(result.data.data)
            });
    }, [location.state])
    if (list.list != undefined) {
        return (
            <div className="notice">
                <BaseSearchInput>
                    <button className="search-button"></button>
                </BaseSearchInput>
                <h2>
                    총<span className="num">{list.total_count}</span
                    >건
                </h2>
                <ul className="item_wrap">
                    {list.list.map((item, index) =>
                        <li key={index}>
                            <span className="left">{item.title}</span>
                            <span className="right">{item.created_at.split(" ")[0]}</span>
                        </li>

                    )}
                </ul>
                <Pagination to={{
                    action: "get_cs_list", //필수
                    current: locationState == null ? 1 : locationState.pageCurrent, //필수
                    type: "notice",
                    keyword: "", //옵션
                }} total={`${list.total_page}`}></Pagination>
            </div>
        )
    } else {
        return null;
    }
}
export default NoticeList
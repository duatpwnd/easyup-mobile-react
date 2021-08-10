import { Link } from "react-router-dom";
import "./RecommendLecture.scoped.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
const RecommendLecture = (prop) => {
  return (
    <div className="section swiper_section" >
      <div className="title-header">
        <h2 className="title">추천 강의</h2>
        <Link to={{
          pathname: "/category", state: {
            title: "전체",
            category_code: "ALL",
            action: "get_course_list",
            keyword: "",
            pageCurrent: 1,
            order: 'type_rating',
          }
        }} className="more-view-btn" >전체보기</Link>
      </div>
      <Swiper
        spaceBetween={8}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => ""}
        onSlideChange={() => ""}
      >
        {prop.lecture != undefined ? prop.lecture.map((item, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="item">
              <Link to={{
                pathname: "/lectureDetail",
                state: {
                  id: item.id
                }
              }}>
                <span className="lecture-list">
                  <img src={item.image_url} />
                </span>
              </Link>
              <div className="evaluate">
                <h4 >{item.teachers}</h4>
                <h2 className="subtitle">{item.title}</h2>
                <span className="score">{item.ranking}</span>
                {item.price.is_free ? <h1 className="free">
                  FREE
                </h1> : <span className="price" >
                  {item.price.format_original != item.price.format_final ? <del
                    className="original"
                  >{item.price.format_original}</del> : ""
                  }
                  <span className="final">{item.price.format_final}</span>
                </span>
                }
              </div>
            </div>
          </SwiperSlide>
        )) : ""}
      </Swiper>
    </div >
  )

}
export default RecommendLecture
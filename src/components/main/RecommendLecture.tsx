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
        <span className="more-view-btn" >전체보기</span
        >
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
              <Link to={`/lectureDetail?id=${item.id}`}>
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
      {/* <Slide :swiper_option="slide_option.recommand_lecture">
      <template slot="list">
        <swiper-slide
          v-for="(list, index) in list.popular_lecture"
          :key="index"
        >
          <LecItem
            @click.native="
              $router.push({
                path: '/lecDetail',
                query: {
                  id: list.id,
                },
              })
            "
          >
            <span className="lec_list" slot="router">
              <img
                :src="list.image_url"
                :alt="list.title"
                :title="list.title"
              />
            </span>
            <h4 slot="teacher">{{ list.teachers }}</h4>
            <h2 className="subtitle" slot="subtitle" v-html="list.title"></h2>
            <span slot="grade" className="score">{{ list.ranking }}</span>
            <h1 className="free" slot="free" v-if="list.price.is_free">
              FREE
            </h1>
            <span className="price" v-else slot="free">
              <del
                className="original"
                v-if="list.price.format_original != list.price.format_final"
                >{{ list.price.format_original }}</del
              >
              <span className="final">{{ list.price.format_final }}</span>
            </span>
          </LecItem>
        </swiper-slide>
      </template>
      <template slot="nav_btn">
        <div
          className="swiper-button-prev swiper-button-prev-3"
          slot="button-prev"
          @click.stop=""
        ></div>
        <div
          className="swiper-button-next swiper-button-next-3"
          slot="button-next"
          @click.stop=""
        ></div>
      </template>
    </Slide> */}
    </div >
  )

}
export default RecommendLecture
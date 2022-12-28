import Container from "react-bootstrap/Container";
import {Col} from "react-bootstrap";
import "./assets/main-detail.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import AsyncImage from "../layout/AsyncImage";
import Skeleton from "../layout/Skeleton";
import {numberFormat} from "../../common/helper";
import {useNavigate} from "react-router-dom";

const MainDetail = ({details, isLoading}) => {
  const navigate = useNavigate();

  const viewOtherProduct = (arg) => {
    navigate({
      pathname: `/detail/${details.id + arg}`,
    });
  }

  return (
    <Container className="main_detail">
      {isLoading ? (
        <Col xs={12} sm={12} lg={12} style={{padding: '0 10px'}}>
          <Skeleton style={{width: '100%', height: '500px', background: '#1f2734'}} />
        </Col>
      ) : details.id ? (
        <div>
          <div className="group_button">
            <button
              onClick={() => viewOtherProduct(-1)}
              className={`btn_left ${details.id === 1 ? 'disabled' : ''}`}
              disabled={details.id === 1}>
              See Previous
            </button>
            <button onClick={() => viewOtherProduct(1)} className="btn_right">See Next</button>
          </div>
          <div className="d-flex flex-wrap py-4 w100">
            <Col xs={12} md={4}>
              <div className="details_left">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#35b500",
                    "--swiper-pagination-color": "#35b500",
                  }}
                  spaceBetween={10}
                  navigation={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {details.images.map((url, key) => {
                    return (
                      <SwiperSlide key={`${details.id}-${key}`}>
                        <AsyncImage
                          title={details.title}
                          alt={details.title}
                          variant="top"
                          loading="lazy"
                          width="100%"
                          className="img-fluid"
                          src={url}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <div className="details_right">
                <h1 className="details_title">
                  {details.title}
                </h1>
                <div className="details_info">
                  <p className="details-item">Category: <span>{details.category}</span></p>
                  <p className="details-item">Description: <span>{details.description}</span></p>
                  <p className="details-item">Price: <span>{numberFormat(details.price)}</span></p>
                  <p className="details-item">Rating: <span>{details.rating}</span></p>
                  <p className="details-item">Stock: <span>{details.stock}</span></p>
                </div>
              </div>
            </Col>
          </div>
        </div>
      ) : (
        <div className="empty_data">Empty data</div>
      )}
    </Container>
  )
}

export default MainDetail;

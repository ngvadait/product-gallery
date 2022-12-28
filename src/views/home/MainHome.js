import {Card, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./assets/main-home.scss";
import AsyncImage from "../layout/AsyncImage";
import {numberFormat} from "../../common/helper";
import Skeleton from "../layout/Skeleton";

const MainHome = ({...props}) => {
  const {listProducts, isLoading} = props;

  return (
    <>
      {isLoading && !listProducts.length ? (
        Array.from(Array(4).keys()).map((_, index) => (
          <Col
            xs={6}
            sm={4}
            lg={3}
            key={index}
            className={`skeleton_custom`}>
            <Skeleton style={{width: '100%', height: '100%', background: '#1f2734'}} />
          </Col>
        ))
      ) : listProducts.length ? (
        listProducts.map((item) => {
          return (
            <Col xs={6} sm={4} lg={3} key={item.id + '-' + item.title} className="mb-3">
              <Card className='h-100 card_custom'>
                <Link to={`/detail/${item.id}`}>
                  <AsyncImage
                    title={item.title}
                    alt={item.title}
                    variant="top"
                    loading="lazy"
                    src={item.thumbnail}
                  />
                  <Card.Body className="body_custom">
                    <Card.Title>
                      {item.title}
                    </Card.Title>
                    <Card.Text>
                      {numberFormat(item.price)}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          )
        })
      ) : (
        <div className='text_center'>Empty Data</div>
      )}
    </>
  )
}

export default MainHome;

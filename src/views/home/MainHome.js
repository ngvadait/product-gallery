import {Card, Col} from "react-bootstrap";
// import {getImage} from "@Common/helper";
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
            <Col xs={6} sm={4} lg={3} key={item.id} className="mb-3">
              <Card className='h-100 card_custom'>
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
                  <div >

                  </div>
                  <Card.Text>
                    {numberFormat(item.price)}
                    {/*{convertDate(item)}*/}
                  </Card.Text>
                </Card.Body>
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

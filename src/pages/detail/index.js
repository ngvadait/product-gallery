import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../../views/layout/Header";
import {fetchProductDetail} from "../../services/detail/detailService";
import MainDetail from "../../views/detail/MainDetail";

const Details = () => {
  let { id } = useParams();
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(details)

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        let data = await fetchProductDetail(id);
        setDetails(data);
      } catch (err) {
        console.log("Product detail error " + err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    if (id) {
      init();
    }
  }, [id])

  return (
    <>
      <Header />
      <MainDetail details={details} isLoading={isLoading} />
    </>
  )
};

export default Details;

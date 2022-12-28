import Header from "../../views/layout/Header";
import {useEffect, useState} from "react";
import {fetchProducts} from "../../services/home/homeService";
import Container from "react-bootstrap/Container";
import MainHome from "../../views/home/MainHome";

const Home = () => {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (currentPage && totalPage && currentPage > totalPage) return;
      try {
        setIsLoading(true);
        let data = await fetchProducts(currentPage);
        setTotalPages(Math.ceil(data.totalResults / 8));
        setListProducts([...listProducts, ...data.products]);
      } catch (err) {
        console.log("LoadProducts error " + err);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [currentPage])

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [listProducts])

  return (
    <div>
      <Header />
      <Container className="d-flex flex-wrap mt-4">
        <MainHome listProducts={listProducts} isLoading={isLoading} />
      </Container>
    </div>
  )
}

export default Home;

import Header from "../../views/layout/Header";
import {useEffect, useState} from "react";
import {fetchProducts} from "../../services/home/homeService";
import Container from "react-bootstrap/Container";
import MainHome from "../../views/home/MainHome";
import FormSearch from "../../views/layout/FormSearch";

const Home = () => {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(null);
  const [word, setWord] = useState('');

  useEffect(() => {
    const init = async () => {
      if (currentPage && totalPage && currentPage > totalPage) return;
      try {
        setIsLoading(true);
        let data = await fetchProducts(currentPage, word);
        setTotalPages(Math.ceil(data.totalResults / 8));
        setListProducts([...listProducts, ...data.products]);
      } catch (err) {
        console.log("LoadProducts error " + err);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [currentPage, word])

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToSearch = (keyword) => {
    if (keyword !== word) {
      setListProducts([]);
    }

    setWord(keyword);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [listProducts])

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <FormSearch goToSearch={goToSearch} />
        <div className="d-flex flex-wrap">
          {word.length > 0 && (
            <p style={{width: '100%', color: '#000', fontWeight: '400', textAlign: 'left', fontSize: '20px', padding: '0 10px'}}>
              Results returned with the keyword: <b>{word}</b>
            </p>
          )}
          <MainHome listProducts={listProducts} isLoading={isLoading} />
        </div>
      </Container>
    </div>
  )
}

export default Home;

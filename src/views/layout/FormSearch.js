import './assets/form_search.scss';
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";

const FormSearch = ({goToSearch}) => {
  const [word, setWord] = useState( '');

  useDebounce(() => {
    goToSearch(word);
    }, [word], 1000
  );

  return (
    <Form
      className="form_custom"
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <Form.Control
        type="search"
        placeholder="Search Product"
        className="me-2"
        aria-label="Search"
        value={word}
        onChange={(e) => {
          setWord(e.currentTarget.value);
        }}
      />
      <Button variant="success outline-success" onClick={() => goToSearch(word)}>Search</Button>
    </Form>
  );
};

export default FormSearch;

import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import api from '../Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [searchingWord, setSearchingWord] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchingWord !== '') {
      setIsLoading(true);

      api(searchingWord, page)
        .then(({ data }) => setItems(prev => [...prev, ...data.hits]))
        .catch(error => {
          setError(error);
          toast('Upppps!');
        })
        .finally(setIsLoading(false));
    }
  }, [page, searchingWord]);

  function onSubmit(e) {
    e.preventDefault();
    const searchingWord = e.target[1].value;
    setSearchingWord(searchingWord);
    setItems([]);
    setPage(1);
  }

  function onLoadMore() {
    setIsLoading(true);
    setPage(prev => prev + 1);
  }

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {error && <ToastContainer />}
      <ImageGallery items={items} />
      {isLoading && <Loader />}
      {items.length > 0 && searchingWord && <Button onLoadMore={onLoadMore} />}
    </>
  );
}
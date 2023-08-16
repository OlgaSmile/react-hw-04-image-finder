import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Api from '../Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiSearch = new Api();

export function App () {
  // state = {
  //   searchingWord: '',
  //   items: [],
  //   isLoading: false,
  //   error: '',
  // };
const [searchingWord, setSearchingWord] = useState('');
const [items, setItems] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

useEffect(() => {
  setIsLoading(true);
  apiSearch.word = searchingWord;
  apiSearch
        .searchPhoto()
        .then(data=>setItems(data.hits))
        .catch(error => {
          setError( error );
          toast('Upppps!');
        })
        .finally(setIsLoading(false));
}, [searchingWord])


  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.searchingWord !== this.state.searchingWord &&
  //     this.state.searchingWord !== ''
  //   ) {
  //     this.setState({ isLoading: true });
  //     apiSearch.word = this.state.searchingWord;
  //     apiSearch
  //       .searchPhoto()
  //       .then(({ data }) => this.setState({ items: data.hits }))
  //       .catch(error => {
  //         this.setState({ error });
  //         toast('Upppps!');
  //       })
  //       .finally(this.setState({ isLoading: false }));
  //   }
  // }

  function onSubmit(e) {
    e.preventDefault();
    const searchingWord = e.target[1].value;
    setSearchingWord( searchingWord );
    apiSearch.resetPage();
  };

  function onLoadMore( e) {
    setIsLoading( true );
    apiSearch.incrementPage();
    apiSearch
      .searchPhoto()
      .then(({ data }) =>
        setItems(prev => [...prev, ...data.hits])
      )
      .finally(setIsLoading( false ));
  };

    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        {error && <ToastContainer />}
        <ImageGallery items={items} />
        {isLoading && <Loader />}
        {items?.length > 0 && searchingWord && (
          <Button onLoadMore={onLoadMore} />
        )}
      </>
    );
  
}
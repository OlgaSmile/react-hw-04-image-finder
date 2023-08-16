import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Api from '../Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiSearch = new Api();

export class App extends Component {
  state = {
    searchingWord: '',
    items: [],
    isLoading: false,
    error: '',
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.searchingWord !== this.state.searchingWord &&
      this.state.searchingWord !== ''
    ) {
      this.setState({ isLoading: true });
      apiSearch.word = this.state.searchingWord;
      apiSearch
        .searchPhoto()
        .then(({ data }) => this.setState({ items: data.hits }))
        .catch(error => {
          this.setState({ error });
          toast('Upppps!');
        })
        .finally(this.setState({ isLoading: false }));
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const searchingWord = e.target[1].value;
    this.setState({ searchingWord });
    apiSearch.resetPage();
  };

  onLoadMore = e => {
    this.setState({ isLoading: true });
    apiSearch.incrementPage();
    apiSearch
      .searchPhoto()
      .then(({ data }) =>
        this.setState(prevState => ({
          items: [...prevState.items, ...data.hits],
        }))
      )
      .finally(this.setState({ isLoading: false }));
  };


  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.error && <ToastContainer />}
        <ImageGallery items={this.state.items} />
        {this.state.isLoading && <Loader />}
        {this.state.items.length > 0 && this.state.searchingWord && (
          <Button onLoadMore={this.onLoadMore} />
        )}
      </>
    );
  }
}
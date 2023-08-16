import Modal from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  onImgClick = e => {
    this.modalToggle();
  };

  modalToggle = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item;

    return (
      <li className={css.ImageGalleryItem}>
        <img
          onClick={this.onImgClick}
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            modalToggle={this.modalToggle}
          />
        )}
      </li>
    );
  }
}
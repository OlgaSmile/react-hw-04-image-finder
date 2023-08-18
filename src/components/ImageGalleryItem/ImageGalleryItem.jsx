import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({item}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function onImgClick (e) {
    modalToggle();
  };

  function modalToggle () {
    setIsModalOpen(!isModalOpen);
  };

    const { webformatURL, tags, largeImageURL } = item;

    return (
      <li className={css.ImageGalleryItem}>
        <img
          onClick={onImgClick}
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            modalToggle={modalToggle}
          />
        )}
      </li>
    );
  }

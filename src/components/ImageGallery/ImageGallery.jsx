import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export default function ImageGallery({ items }) {
  return (
    <>
      <ul className={css.ImageGallery}>
        {items.map(item => (
          <ImageGalleryItem item={item} key={item.id} />
        ))}
      </ul>
    </>
  );
}
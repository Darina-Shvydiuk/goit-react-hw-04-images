import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <li className={s.gallery_item}>
      <img
        className={s.gallery_item_image}
        src={webformatURL}
        alt={tags?.split(',')}
        onClick={handleModalOpen}
      />
      {isModalOpen && (
        <Modal onCloseModal={handleModalOpen}>
          <img src={largeImageURL} alt={tags?.split(',')} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

import s from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const ImageGallery = ({ status, images, isLoadBtnShown, onClick }) => {
  return (
    <>
      {status === Status.REJECTED && (
        <p className={s.error}>Something went wrong....</p>
      )}
      <ul className={s.gallery}>
        {images.map(({ webformatURL, largeImageURL, tags, id }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
      </ul>
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && isLoadBtnShown && (
        <Button onClick={onClick}></Button>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoadBtnShown: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

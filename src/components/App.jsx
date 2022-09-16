import s from './App.module.css';

import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar';
import { fetchImages } from './services/Api';
import { ImageGallery } from './ImageGallery';

const PER_PAGE = 20;

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [isLoadBtnShown, setIsLoadBtnShown] = useState(true);

  const getImagesHook = useCallback(async () => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);

    try {
      const { data } = await fetchImages(query, page);

      if (!data.hits.length) {
        setStatus(Status.REJECTED);
        setImages([]);
        return toast.info('Are you probably wrong? Try again.');
      }

      setStatus(Status.RESOLVED);
      setImages(prevImages =>
        page > 1 ? [...prevImages, ...data.hits] : data.hits
      );
      setIsLoadBtnShown(
        data.totalHits > PER_PAGE && data.totalHits / page > PER_PAGE
      );
    } catch {
      setStatus(Status.REJECTED);
    }
  }, [query, page]);

  useEffect(() => {
    getImagesHook();
  }, [getImagesHook]);

  const handleFormSubmit = search => {
    setPage(1);
    setQuery(search);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        isLoadBtnShown={isLoadBtnShown}
        images={images}
        onClick={handleLoadMoreClick}
        status={status}
      />

      <ToastContainer autoClose={3000} />
    </div>
  );
};

// варіант 2 через іфі

// useEffect(() => {

// (async () => {
//   if (!query) {
//     return;
//   }
//   setStatus(Status.PENDING);
//   try {
//     const { data } = await fetchImages(query, page);
//     if (!data.hits.length) {
//       setStatus(Status.REJECTED);
//       setImages([]);
//       return toast.info('Are you probably wrong? Try again.');
//     }
//     setStatus(Status.RESOLVED);
//     setImages(prevImages =>
//       page > 1 ? [...prevImages, ...data.hits] : data.hits
//     );
//     setIsLoadBtnShown(
//       data.totalHits > PER_PAGE && data.totalHits / page > PER_PAGE
//     );
//   } catch {
//     setStatus(Status.REJECTED);
//   }
// })();
// }, [query,page]);

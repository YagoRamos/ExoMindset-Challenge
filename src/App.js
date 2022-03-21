import React, { useState, useEffect } from 'react';
import ShowsList from './components/shows/ShowsList';
import './App.css';
import ShowDetails from './components/shows/ShowDetails';

function App() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showSelected, setShowSelected] = useState([]);

  useEffect(() => {
    let cancel = false;
    setError(null);
    setIsLoading(true);

    fetch('http://api.tvmaze.com/search/shows?q=girls')
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was an unexpected error.");
        }
        return response.json();
      })
      .then((data) => {
        const transformedShows = data.map((showData) => {
          return {
            id: showData.show.id,
            title: showData.show.name,
            description: showData.show.summary,
            premiered: showData.show.premiered,
            thumbnail: showData.show.image?.medium,
            originalImage: showData.show.image?.original,
            rating: showData.show.rating?.average,
            genres: showData.show.genres,
            status: showData.show.status
          };
        });
        if (cancel) return;
        setShows(transformedShows);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      cancel = true;
    }
  }, [])

  function openModal(id) {
    const showSelected = shows.find(show => show.id === id);
    setShowSelected(showSelected);
    setIsOpen(true);
  }

  function handleCloseModal(event, data) {
    setIsOpen(false);
  }

  let content = <p>No results.</p>;

  if (shows.length > 0) {
    content = <ShowsList shows={shows} onModalOpen={openModal} />;
  }

  if (error) {
    content = <div label>{error}</div>;
  }

  if (isLoading) {
    content = <p>Searching...</p>;
  }

  return (
    <React.Fragment>
      {modalIsOpen && <ShowDetails showData={showSelected} onCloseModal={handleCloseModal} />}
      <section>
        <section>{content}</section>
      </section>
    </React.Fragment>
  );
}

export default App;

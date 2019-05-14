import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PlaylistContext = createContext({
  videos: [],
  setVideos: () => [],
});

const PlaylistProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const addVideos = videoData => setVideos([...videos, videoData]);

  return (
    <PlaylistContext.Provider value={{ videos, addVideos }}>
      {children}
    </PlaylistContext.Provider>
  );
};

PlaylistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PlaylistContext, PlaylistProvider };

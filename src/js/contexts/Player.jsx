import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PlayerContext = createContext({
  currentVideo: '',
});

const PlayerProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState('');

  return (
    <PlayerContext.Provider value={{ currentVideo, setCurrentVideo }}>
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PlayerContext, PlayerProvider };

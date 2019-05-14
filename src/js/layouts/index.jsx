import React from 'react';

import { PlaylistProvider } from 'contexts/Playlist';
import { PlayerProvider } from 'contexts/Player';

import Form from 'components/Form';
import Player from 'components/Player';
import Playlist from 'components/Playlist';

const Layout = () => (
  <PlaylistProvider>
    <Form />
    <PlayerProvider>
      <Player />
      <Playlist />
    </PlayerProvider>
  </PlaylistProvider>
);

export default Layout;

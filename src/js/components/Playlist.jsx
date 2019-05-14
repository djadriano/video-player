import React, { useContext } from 'react';

import { getYouTubeVideoId } from 'utils/general';
import { PlaylistContext } from 'contexts/Playlist';
import { PlayerContext } from 'contexts/Player';

const Playlist = () => {
  const { videos } = useContext(PlaylistContext);
  const { setCurrentVideo } = useContext(PlayerContext);

  const selectVideo = videoId => setCurrentVideo(videoId);

  const seeVideos = () => {
    const playlistEl = document.querySelector('.xite-playlist');
    playlistEl.classList.toggle('xite-playlist--opened');
  };

  return (
    <section className="xite-playlist">
      <header className="xite-playlist__header">
        <h1 className="xite-fs-small">Videos ({videos.length})</h1>
        <button
          type="button"
          className="xite-playlist__button"
          onClick={seeVideos}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="xite-playlist__icon"
          >
            <path
              d="M.246 15.307v-4.102h10.645V.487h4.174v10.718H25.71v4.102H15.065V26h-4.174V15.307z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </header>
      <ul className="xite-playlist-videos">
        {videos.map(({ artist, title, videoId }, i) => (
          <li key={i} onClick={() => selectVideo(videoId)}>
            <figure className="xite-playlist-videos__figure">
              <img
                src={`http://i3.ytimg.com/vi/${getYouTubeVideoId(
                  videoId
                )}/hqdefault.jpg`}
                alt=""
              />
              <figcaption>
                <h2 className="xite-fs-small">{artist}</h2>
                <h3 className="xite-fs-small">{title}</h3>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Playlist;

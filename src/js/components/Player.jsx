import React, {
  Fragment,
  useContext,
  useLayoutEffect,
  useEffect,
  useState,
} from 'react';

import { PlayerContext } from 'contexts/Player';
import { PlaylistContext } from 'contexts/Playlist';
import { delay } from 'utils/general';

function Player() {
  const { currentVideo, setCurrentVideo } = useContext(PlayerContext);
  const { videos } = useContext(PlaylistContext);
  const [playerInstance, setPlayerInstance] = useState(null);
  const [videoFinished, setVideoFinished] = useState(false);

  // -----------------------------------------------------
  // Methods
  // -----------------------------------------------------

  function insertYTScript() {
    const tag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];
    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // -----------------------------------------------------

  function onPlayerStateChange(evt) {
    if (evt.data === 0) setVideoFinished(true);
  }

  // -----------------------------------------------------

  function initializeYouTube() {
    const ytPlayer = new window.YT.Player('xite-player', {
      height: '100%',
      width: '100%',
      videoId: currentVideo,
      events: {
        onStateChange: onPlayerStateChange,
      },
      playerVars: { rel: 0 },
    });

    setPlayerInstance(ytPlayer);
  }

  // -----------------------------------------------------

  function getNextVideo() {
    const currentVideoIndex = videos.findIndex(
      item => item.videoId === currentVideo
    );
    const nextVideoIndex =
      currentVideoIndex + 1 <= videos.length - 1 ? currentVideoIndex + 1 : 0;

    if (videoFinished) {
      const { videoId } = videos[nextVideoIndex];
      setCurrentVideo(videoId);
    }
  }

  // -----------------------------------------------------

  // Youtube Onload Callback
  window.onYouTubeIframeAPIReady = initializeYouTube;

  // -----------------------------------------------------
  // React Effects
  // -----------------------------------------------------

  // Load Youtube Iframe Api Async
  useLayoutEffect(insertYTScript, []);

  // Load a new Video when currentVideo changes
  useEffect(() => {
    const loadVideo = async () => {
      const playerTitleEl = document.querySelector('.xite-player-logo');
      const playlistEl = document.querySelector('.xite-playlist');
      const playerEl = document.querySelector('#xite-player');

      if (playerInstance) {
        if (!playerTitleEl.classList.contains('xite-player-logo--hide'))
          playerTitleEl.classList.add('xite-player-logo--hide');

        playerInstance.loadVideoById(currentVideo);

        await delay(1000);

        playerEl.classList.add('xite-player--show');
        playlistEl.classList.remove('xite-playlist--opened');

        if (videoFinished) setVideoFinished(false);
      }
    };

    loadVideo();
  }, [currentVideo]);

  // Load the next video when video is finished
  useEffect(getNextVideo, [videoFinished]);

  // -----------------------------------------------------
  // Render
  // -----------------------------------------------------

  return (
    <Fragment>
      <h1 className="xite-player-logo xite-fs-huge">
        XITE
        <br />
        <span className="xite-fs-small">player</span>
      </h1>
      <div id="xite-player" />
    </Fragment>
  );
}

export default Player;

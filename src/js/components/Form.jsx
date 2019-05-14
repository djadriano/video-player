import React, { useContext } from 'react';

import { getYouTubeVideoId } from 'utils/general';
import { PlaylistContext } from 'contexts/Playlist';

const Form = () => {
  const { addVideos } = useContext(PlaylistContext);

  const setPlaylistFilled = () => {
    const playlistEl = document.querySelector('.xite-playlist');

    if (!playlistEl.classList.contains('xite-playlist--filled'))
      playlistEl.classList.add('xite-playlist--filled');
  };

  const onSubmit = evt => {
    evt.preventDefault();

    const formEl = evt.target;
    const artistField = formEl.querySelector('[name="artist"]');
    const titleField = formEl.querySelector('[name="title"]');
    const videoUrlField = formEl.querySelector('[name="video-url"]');

    addVideos({
      artist: artistField.value,
      title: titleField.value,
      videoId: getYouTubeVideoId(videoUrlField.value),
    });

    formEl.reset();

    setPlaylistFilled();
  };

  const focusFirstField = () => {
    const formEl = document.querySelector('.xite-form');
    if (formEl.elements.length) formEl.elements[0].focus();
  };

  const onToggleButton = () => {
    const headerEl = document.querySelector('.xite-header');
    headerEl.classList.toggle('xite-header--opened');

    if (headerEl.classList.contains('xite-header--opened')) focusFirstField();
  };

  return (
    <header className="xite-header">
      <form className="xite-form" onSubmit={onSubmit}>
        <input
          name="artist"
          type="text"
          placeholder="Artist"
          className="xite-fs-medium"
          autoComplete="off"
          maxLength="60"
          required
        />
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="xite-fs-medium"
          autoComplete="off"
          maxLength="60"
          required
        />
        <input
          name="video-url"
          type="text"
          placeholder="Video Url"
          className="xite-fs-medium"
          autoComplete="off"
          maxLength="255"
          required
        />
        <button type="submit" className="xite-form__button xite-fs-small">
          Add Video
        </button>
      </form>
      <button
        type="button"
        className="xite-header__button"
        onClick={onToggleButton}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="xite-header__icon">
          <path
            d="M.246 15.307v-4.102h10.645V.487h4.174v10.718H25.71v4.102H15.065V26h-4.174V15.307z"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </header>
  );
};

export default Form;

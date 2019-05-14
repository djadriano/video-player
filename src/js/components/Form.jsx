import React, { useContext } from 'react';

import { getYouTubeVideoId } from 'utils/general';
import { PlaylistContext } from 'contexts/Playlist';

const Form = () => {
  const { addVideos } = useContext(PlaylistContext);

  const setPlaylistFilled = () => {
    const playlistEl = document.querySelector('.vp-playlist');

    if (!playlistEl.classList.contains('vp-playlist--filled'))
      playlistEl.classList.add('vp-playlist--filled');
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
    const formEl = document.querySelector('.vp-form');
    if (formEl.elements.length) formEl.elements[0].focus();
  };

  const onToggleButton = () => {
    const headerEl = document.querySelector('.vp-header');
    headerEl.classList.toggle('vp-header--opened');

    if (headerEl.classList.contains('vp-header--opened')) focusFirstField();
  };

  return (
    <header className="vp-header">
      <form className="vp-form" onSubmit={onSubmit}>
        <input
          name="artist"
          type="text"
          placeholder="Artist"
          className="vp-fs-medium"
          autoComplete="off"
          maxLength="60"
          required
        />
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="vp-fs-medium"
          autoComplete="off"
          maxLength="60"
          required
        />
        <input
          name="video-url"
          type="text"
          placeholder="Video Url"
          className="vp-fs-medium"
          autoComplete="off"
          maxLength="255"
          required
        />
        <button type="submit" className="vp-form__button vp-fs-small">
          Add Video
        </button>
      </form>
      <button
        type="button"
        className="vp-header__button"
        onClick={onToggleButton}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="vp-header__icon">
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

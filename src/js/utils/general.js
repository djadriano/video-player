export const getYouTubeVideoId = url => {
  const getUrl = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);

  return undefined !== getUrl[2]
    ? getUrl[2].split(/[^0-9a-z_-]/i)[0]
    : getUrl[0];
};

export const delay = int =>
  new Promise(resolve => {
    setTimeout(resolve, int);
  });

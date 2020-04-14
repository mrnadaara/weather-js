const key = 'X8AcbwL6m82nO77_lDrN09rXcqQD6wwIQphknzsISmI';

const getImage = async (query) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape`,
    {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${key}`,
      },
    },
  );
  const result = await response.json();

  return result;
};

export { getImage };
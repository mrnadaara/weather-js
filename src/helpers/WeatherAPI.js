const key = 'eefba73a0c1ebd313f30bff79bc74116';

const getWeather = async (city, idProvided) => {
  const queryType = idProvided ? 'id' : 'q';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${queryType}=${city}&appid=${key}`,
  );

  if (response.status === 404) {
    throw new Error('City not found!');
  }
  const result = await response.json();
  return result;
};

export { getWeather };
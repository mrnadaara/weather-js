const key = 'eefba73a0c1ebd313f30bff79bc74116';

const getWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${key}`,
  );
  const result = await response.json();

  return result;
};

export { getWeather };
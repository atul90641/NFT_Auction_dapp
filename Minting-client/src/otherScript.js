import { elements } from './data'; // Assuming `data.js` is in the same directory

const myFunction = () => {
  const getRandomElement = () => {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  };

  const randomElement = getRandomElement();

  return (
    randomElement
  );
};

export default myFunction;
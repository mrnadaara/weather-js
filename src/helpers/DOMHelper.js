const createElement = (type, classes = null, attributes = null) => {
  const element = document.createElement(type);
  if (classes) {
    classes.forEach((className) => {
      element.classList.add(className);
    });
  }
  if (attributes) {
    attributes.forEach(({ prop, value }) => {
      element.setAttribute(prop, value);
    });
  }
  return element;
};

export { createElement };

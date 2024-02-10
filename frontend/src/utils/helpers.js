function isValidImageURL(value) {
  const imageRegex = /\.(jpeg|jpg|gif|png|svg)(\?.*)?$/i;
  return imageRegex.test(value);
}

export { isValidImageURL };
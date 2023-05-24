const sortAlphabetically = (array, value) => {
  let arrayCopy = [...array];
  arrayCopy.sort((a, b) => {
    let sortA = a[value];
    let sortB = b[value];
    if (sortA < sortB) {
      return -1;
    }
    if (sortA > sortB) {
      return 1;
    }
    return 0;
  });
  return arrayCopy;
};

const sortNumerically = (array, value) => {
  let arrayCopy = [...array];
  arrayCopy.sort((a, b) => {
    let sortA = a[value];
    let sortB = b[value];
    return sortA - sortB;
  });
  return arrayCopy;
};

export { sortAlphabetically, sortNumerically };

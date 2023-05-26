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

const capitalise = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { sortAlphabetically, sortNumerically, capitalise, months };

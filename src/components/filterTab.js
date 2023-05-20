const FilterTab = ({ filter, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={filter.toLowerCase()}
      id={`filter-${filter}`}
    >
      {filter}
    </button>
  );
};

export default FilterTab;

//test

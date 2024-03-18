import './styles.css';
import P from 'prop-types';

export const SearchCoffeeInput = ({ searchValue, handleSearchButtonChange }) => {
  return (
    <input
      className="search-coffee-input"
      placeholder="procure o café pelo nome"
      type="search"
      onChange={handleSearchButtonChange}
      value={searchValue}
    />
  );
};

SearchCoffeeInput.propTypes = {
  searchValue: P.string.isRequired,
  handleSearchButtonChange: P.func.isRequired,
};

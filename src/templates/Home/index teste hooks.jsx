import './styles.css';
import React, { useState, useEffect, useCallback } from 'react';
import { loadHotCoffees, loadIcedCoffees } from '../../utils/loadCoffees';
import { Coffees } from '../../components/Coffees';
import { LoadMoreCoffeesButton } from '../../components/LoadMoreCoffeesButton';
import { SearchCoffeeInput } from '../../components/SearchCoffeeInput';

export function Home() {
  const [coffees, setCoffees] = useState([]);
  const [theme, setTheme] = useState('hot');
  const [allCoffees, setAllCoffees] = useState([]);
  const [page, setPage] = useState(0);
  const [coffeesPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const setStateWithCoffees = useCallback(
    ({ coffees, theme }) => {
      setCoffees(coffees.slice(page, coffeesPerPage));
      setTheme(theme);
      setAllCoffees(coffees);
    },
    [coffeesPerPage, page],
  );

  const handleLoadHotCoffees = useCallback(() => {
    setPage(0);
    loadHotCoffees(setStateWithCoffees);
  }, [setStateWithCoffees]);

  useEffect(() => {
    handleLoadHotCoffees();
  }, [handleLoadHotCoffees]);

  const handleLoadIcedCoffees = useCallback(() => {
    setPage(0);
    loadIcedCoffees(setStateWithCoffees);
  }, [setStateWithCoffees]);

  const loadMoreCoffees = () => {
    const nextPage = page + coffeesPerPage;
    const nextPosts = allCoffees.slice(nextPage, nextPage + coffeesPerPage);
    setCoffees((currentCoffees) => [...currentCoffees, ...nextPosts]);
    setPage(nextPage);
  };

  const handleSearchCoffeeInput = (e) => {
    setSearchValue(e.target.value);
  };

  const containerStyle = theme === 'iced' ? { backgroundColor: 'lightblue' } : { backgroundColor: 'orange' };
  const noMorePosts = page + coffeesPerPage >= allCoffees.length;

  const filteredCoffees = searchValue
    ? allCoffees.filter((coffee) => coffee.title.toLowerCase().includes(searchValue.toLowerCase()))
    : coffees;

  return (
    <section className="container" style={containerStyle}>
      <div id="coldOrHotButton" className="coldOrHotButton">
        <button onClick={handleLoadIcedCoffees} id="icedButton">
          iced
        </button>
        <button onClick={handleLoadHotCoffees} id="hotButton">
          hot
        </button>
      </div>
      <div className="searchCoffeeInput-container">
        {searchValue && <h1>Search value: {searchValue}</h1>}
        <SearchCoffeeInput searchValue={searchValue} handleSearchButtonChange={handleSearchCoffeeInput} />
      </div>
      {filteredCoffees.length > 0 && <Coffees coffees={filteredCoffees} />}
      {filteredCoffees.length === 0 && <p>Café não encontrado =(</p>}
      <div className="loadMoreCoffeesButton-container">
        {!searchValue && (
          <LoadMoreCoffeesButton text="Load more posts" onClick={loadMoreCoffees} disabled={noMorePosts} />
        )}
      </div>
    </section>
  );
}

import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import {loadHotCoffees,loadIcedCoffees} from '../../utils/loadCoffees'
import { Coffees } from '../../components/Coffees';
import { LoadMoreCoffeesButton } from '../../components/LoadMoreCoffeesButton';
import { SearchCoffeeInput } from '../../components/SearchCoffeeInput';

export const Home = () => {
 const [coffees, setCoffees] = useState([]);
 const [theme, setTheme] = useState('hot');
 const [allCoffees, setAllCoffees] = useState([]);
 const [page, setPage] = useState(0);
 const [coffeesPerPage, setCoffeesPerPage] = useState(2);
 const [searchValue, setSearchValue] = useState('');

 const setStateWithCoffees = useCallback(({ coffees, theme }) => {
   setCoffees(coffees.slice(page, coffeesPerPage));
   setTheme(theme);
   setAllCoffees(coffees);
 }, [setCoffees, setTheme, setAllCoffees, page, coffeesPerPage]);

  const handleLoadHotCoffees = useCallback(() => {
    setPage(0);
    (loadHotCoffees(setStateWithCoffees));
  }, [setStateWithCoffees]);
  
  const handleLoadIcedCoffees = () => {
    setPage(0);
    (loadIcedCoffees(setStateWithCoffees));
  };

  useEffect(() => {
    handleLoadHotCoffees()
  }, [handleLoadHotCoffees])


  const loadMoreCoffees = () => {
    const nextPage = page + coffeesPerPage;
    const nextPosts = allCoffees.slice(nextPage, nextPage + coffeesPerPage);
    setCoffees([coffees, ...nextPosts]);
    setPage(nextPage);
  };

  const handleSearchCoffeeInput = (e) => {
    const {value} = e.target;
    setSearchValue(value);
  }

    const containerStyle = theme === 'iced' ? { backgroundColor: 'lightblue' } : { backgroundColor: 'orange' };
  
    const noMorePosts = page + coffeesPerPage >= allCoffees.length;

    const filteredCoffees = searchValue
                            ? allCoffees.filter(coffee => {console.log(coffee); return coffee.title.toLowerCase().includes(searchValue.toLowerCase())})
                            : coffees

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
        <div className='searchCoffeeInput-container'>
          {!!searchValue && (
              <h1>Search value: {searchValue}</h1>
            )}
          <SearchCoffeeInput searchValue={searchValue} handleSearchButtonChange={handleSearchCoffeeInput}/>
        </div>
        {filteredCoffees.length > 0 && (<Coffees coffees={filteredCoffees} />)}
        
        {filteredCoffees.length === 0 && ( <p>Café não encontrado =(</p>)}
        <div className="loadMoreCoffeesButton-container">
          {!searchValue && (<LoadMoreCoffeesButton
          text="Load more posts"
          onClick={loadMoreCoffees}
          disabled={noMorePosts}
        />)}
        </div>
      </section>
    );
  
}

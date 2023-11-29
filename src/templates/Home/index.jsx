import './styles.css';
import { Component } from 'react';
import {loadHotCoffees,loadIcedCoffees} from '../../utils/loadCoffees'
import { Coffees } from '../../components/Coffees';
import { LoadMoreCoffeesButton } from '../../components/LoadMoreCoffeesButton';
import { SearchCoffeeInput } from '../../components/SearchCoffeeInput';

export class Home extends Component {
  state = {
    coffees: [],
    theme: 'hot',
    allCoffees: [],
    page: 0,
    coffeesPerPage: 2,
    searchValue: ''
  };

  handleLoadHotCoffees = () => {
    this.setState({page:0});
    (loadHotCoffees(this.setStateWithCoffees));
  };

  handleLoadIcedCoffees = () => {
    this.setState({page:0});
    (loadIcedCoffees(this.setStateWithCoffees));
  };

  setStateWithCoffees = ({coffees, theme}) => {
    const {page, coffeesPerPage} = this.state;
    this.setState({ coffees: coffees.slice(page, coffeesPerPage), theme, allCoffees: coffees });
  };

  componentDidMount(){
    this.handleLoadHotCoffees();
  }

  loadMoreCoffees = () => {
    const {
      page,
      coffeesPerPage,
      allCoffees,
      coffees
    } = this.state;
    const nextPage = page + coffeesPerPage;
    const nextPosts = allCoffees.slice(nextPage, nextPage + coffeesPerPage);
    coffees.push(...nextPosts);

    this.setState({ coffees, page: nextPage });
  }

  handleSearchCoffeeInput = (e) => {
    const {value} = e.target;
    this.setState({searchValue:value})
  }

  render() {
    const { coffees, theme, page, coffeesPerPage, allCoffees, searchValue } = this.state;
  
    const containerStyle = theme === 'iced' ? { backgroundColor: 'lightblue' } : { backgroundColor: 'orange' };
  
    const noMorePosts = page + coffeesPerPage >= allCoffees.length;

    const filteredCoffees = !!searchValue
                            ? allCoffees.filter(coffee => {console.log(coffee); return coffee.title.toLowerCase().includes(searchValue.toLowerCase())})
                            : coffees

    return (
      <section className="container" style={containerStyle}>
        <div id="coldOrHotButton" className="coldOrHotButton">
          <button onClick={this.handleLoadIcedCoffees} id="icedButton">
            iced
          </button>
          <button onClick={this.handleLoadHotCoffees} id="hotButton">
            hot
          </button>
        </div>
        <div className='searchCoffeeInput-container'>
          {!!searchValue && (
              <h1>Search value: {searchValue}</h1>
            )}
          <SearchCoffeeInput searchValue={searchValue} handleSearchButtonChange={this.handleSearchCoffeeInput}/>
        </div>
        {filteredCoffees.length > 0 && (<Coffees coffees={filteredCoffees} />)}
        
        {filteredCoffees.length === 0 && ( <p>Café não encontrado =(</p>)}
        <div className="loadMoreCoffeesButton-container">
          {!searchValue && (<LoadMoreCoffeesButton
          text="Load more posts"
          onClick={this.loadMoreCoffees}
          disabled={noMorePosts}
        />)}
        </div>
      </section>
    );
  }
  
}

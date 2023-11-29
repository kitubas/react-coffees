import './styles.css'

export const SearchCoffeeInput = ({searchValue, handleSearchButtonChange}) => {

    return (
    <input 
    className="search-coffee-input"
    placeholder='procure o café pelo nome'
    type="search"
    onChange={handleSearchButtonChange}
    value={searchValue}
    />    
    )

}
import P from 'prop-types';
import './styles.css';

export const CoffeeCard = ({ coffee }) => (
  <div className="coffee">
    <img src={coffee.image} alt={coffee.title} />
    <div className="coffee-content">
      <h2>{coffee.title}</h2>
      <p>{coffee.description}</p>
    </div>
  </div>
);

CoffeeCard.propTypes = {
  coffee: P.object.isRequired,
};

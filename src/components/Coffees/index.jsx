import './styles.css';
import P from 'prop-types';

import { CoffeeCard } from '../CoffeeCard';

export const Coffees = ({ coffees }) => (
  <div className="coffees">
    {coffees?.map((coffee) => (
      <CoffeeCard key={coffee.id} coffee={coffee} />
    ))}
  </div>
);

Coffees.propTypes = {
  coffees: P.array,
};

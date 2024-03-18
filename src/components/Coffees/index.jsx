import './styles.css'

import { CoffeeCard } from '../CoffeeCard';

export const Coffees = ({coffees}) => (
  <div className="coffees">
    {coffees?.map((coffee) => (
      <CoffeeCard key={coffee.id} coffee={coffee} />
    ))}
  </div>
);
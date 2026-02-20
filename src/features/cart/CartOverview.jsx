import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className='bg-stone-800 uppercase text-stone-200 p-4 px-4 py-4 sm:px-6'>
      <p className='text-semibold-300 text-stone-300 space-x-4 sm:space-x-6 text-sm md:text-base'>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

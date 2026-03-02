import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity); //from cartSlice
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className='item-center flex justify-between bg-stone-800 p-4 px-4 py-4 uppercase text-stone-200 sm:px-6'>
      <p className='text-semibold-300 space-x-4 text-sm text-stone-300 sm:space-x-6 md:text-base'>
        <span>
          {totalCartQuantity} {totalCartQuantity === 1 ? 'pizza' : 'pizzas'}
        </span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

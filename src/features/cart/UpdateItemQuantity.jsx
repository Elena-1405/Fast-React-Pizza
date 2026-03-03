import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ id, currentQuantity }) {
  const dispatch = useDispatch();

  function decreaseQuantity() {
    dispatch(decreaseItemQuantity(id));
  }

  function increaseQuantity() {
    dispatch(increaseItemQuantity(id));
  }
  return (
    <div className='flex items-center gap-2 md:gap-3'>
      <Button type='round' onClick={decreaseQuantity}>
        -
      </Button>
      <span className='text-sm font-medium'>{currentQuantity}</span>
      <Button type='round' onClick={increaseQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;

import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  function getPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>
        Ready to order? Let&apos;s go!
      </h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username}
            required
          />
        </div>
        <div className='relative mb-5'>
          <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
            <label className='sm:basis-40'>Phone number</label>
            <div className='grow'>
              <input
                className='input w-full'
                type='tel'
                name='phone'
                required
              />
              {formErrors?.phone && (
                <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
            <label className='sm:basis-40'>Address</label>
            <div className='grow'>
              <input
                className='input w-full'
                type='text'
                name='address'
                defaultValue={address}
                disabled={isLoadingAddress}
                required
              />
            </div>

            {!position.latitude && !position.longtitude && (
              <span className='absolute bottom-[3px] right-[3px] z-20 md:right-[5px] md:top-[5px]'>
                <Button
                  disabled={isLoadingAddress}
                  type='small'
                  onClick={getPosition}
                >
                  Get position
                </Button>
              </span>
            )}
          </div>
          {addressStatus === 'error' && (
            <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 sm:ml-40'>
              {errorAddress}
            </p>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to you give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.latitude && position.longtitude
                ? `${position.latitude}, ${position.longtitude}`
                : ''
            }
          />
          <Button type='primary' disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const rawCart = JSON.parse(data.cart);

  const order = {
    customer: data.customer,
    phone: data.phone,
    address: data.address,
    priority: data.priority === 'true',
    cart: rawCart.map((item) => ({
      pizzaId: item.id, // API ожидает pizzaId
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    })),
  };

  //console.log('Final Order Object:', order); //в консоли браузера, что в поле cart теперь есть pizzaId

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please insert the correct phone number.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

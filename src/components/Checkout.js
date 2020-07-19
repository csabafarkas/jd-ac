import React, { useEffect, useReducer } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

const fetchCheckoutSession = async ({ id, quantity, url }) => {
  const checkout = await axios.post('/create-checkout-session', {
    id,
    quantity,
    url,
  });
};

const formatPrice = (amount) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'eur',
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  //const total = (quantity * amount).toFixed(2);
  return numberFormat.format(amount);
};

function reducer(state, action) {
  switch (action.type) {
    case 'useEffectUpdate':
      return {
        ...state,
        ...action.payload,
        price: formatPrice({
          amount: action.payload.unitAmount,
          currency: action.payload.currency,
          quantity: state.quantity,
        }),
      };
    case 'increment':
      return {
        ...state,
        quantity: state.quantity + 1,
        price: formatPrice({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity + 1,
        }),
      };
    case 'decrement':
      return {
        ...state,
        quantity: state.quantity - 1,
        price: formatPrice({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity - 1,
        }),
      };
    case 'setLoading':
      return { ...state, loading: action.payload.loading };
    case 'setError':
      return { ...state, error: action.payload.error };
    default:
      throw new Error();
  }
}

const Checkout = () => {
  axios.defaults.baseURL =
    'https://elated-torvalds-69c91d.netlify.app/.netlify/functions/server';
  const [state, dispatch] = useReducer(reducer, {
    products: null,
    loading: false,
    error: null,
    stripe: null,
    url: 'http://localhost:3000',
  });

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const res = await axios.get('/config');
      console.log(res);
      const { publicKey, products } = res.data;

      products.forEach((p) => (p.unitAmount = formatPrice(p.unitAmount)));
      // Make sure to call `loadStripe` outside of a component’s render to avoid
      // recreating the `Stripe` object on every render.
      dispatch({
        type: 'useEffectUpdate',
        payload: { products, stripe: await loadStripe(publicKey) },
      });
    }
    fetchConfig();
  }, []);

  const handleClick = async ({ id }) => {
    // Call your backend to create the Checkout session.
    dispatch({ type: 'setLoading', payload: { loading: true } });
    console.log('id', id);
    const { sessionId } = await fetchCheckoutSession({
      id: id,
      url: state.url,
      locale: 'en-IE',
    });
    // When the customer clicks on the button, redirect them to Checkout.
    const { error } = await state.stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      dispatch({ type: 'setError', payload: { error } });
      dispatch({ type: 'setLoading', payload: { loading: false } });
    }
  };

  const products = state.products
    ? state.products
        .sort(
          (pr, pr1) => Number.parseInt(pr.index) - Number.parseInt(pr1.index)
        )
        .map((p, index) => {
          return (
            <section className='container' key={index}>
              <div className='container-image-holder'>
                <div
                  className='container-image'
                  style={{
                    backgroundImage: `url('${p.images[0]}')`,
                  }}
                />
              </div>
              <div className='container-info'>
                <div className='container-title'>
                  <h1>{p.productName}</h1>
                </div>
                <p className='container-description'>{p.productDescription}</p>
              </div>
              <div className='order-button'>
                <button
                  role='link'
                  onClick={() => handleClick({ id: p.id })}
                  disabled={!state.stripe || state.loading}
                >
                  {state.loading || !state.price
                    ? `Loading...`
                    : `Book for ${p.unitAmount}`}
                </button>
              </div>
              {state.error ? (
                <div className='sr-field-error'>{state.error?.message}</div>
              ) : null}
            </section>
          );
        })
    : null;

  return (
    <div className='sr-main'>{products ? products : <LoadingSpinner />}</div>
  );
};

export default Checkout;

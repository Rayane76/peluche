'use client'
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Check(){

    const [articles,setArticles] = useState(null);

    useEffect(()=>{
        const lcl = localStorage.getItem("article");
        setArticles(JSON.parse(lcl));
    },[])

    const options = articles
    ? {
        mode: 'payment',
        currency: 'eur',
        amount: articles.price
      }
    : null;


    return(
        <> 
        {articles && options && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm price={articles.price} articles={articles.articles} />
        </Elements>
      )}
        </>
    )
}
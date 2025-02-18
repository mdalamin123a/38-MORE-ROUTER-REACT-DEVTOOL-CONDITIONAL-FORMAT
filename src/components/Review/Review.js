import React, { useEffect, useState } from 'react';
import {getDatabaseCart, removeFromDatabaseCart} from '../../utilities/fakedb';
import products from '../../fakeData/products'
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = products.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);        
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    return (
        <div>
            <h1>Cart Items : {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
            }
        </div>
    );
};

export default Review;
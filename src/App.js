import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();  // this all done by api by calling commerce._____ 

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve()) //this can also written like fetchProducts function which is just above
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    return (
        <div>
        <Navbar totalItems={cart.total_items} />
        {/*<Products products={products} onAddToCart={handleAddToCart} />*/}  
        <Cart cart={cart} />
    </div>
    )
}

export default App;

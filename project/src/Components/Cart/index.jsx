import { useEffect, useState, createContext } from "react";
import CartFooter from "../CartFooter/CartFooter";
import CartHeader from "../CartHeader";
import CartProduct from "../Product";
import Button from "../Button";

export const AppContext = createContext(null)

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(null);
    const [fetchData, setFetchData] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:8000/products').then(result => result.json()).then(data =>{
            setCart(data);
        })
    }, [fetchData])

    useEffect(()=>{
        if (cart) {
            setTotal({
                price: cart.reduce((prev, curr) =>  prev + curr.priceTotal, 0), 
                count: cart.reduce((prev, curr) =>  prev + curr.count, 0)
            });
        }     
    }, [cart])

    const deleteProduct = (id) => {
        setCart(cart => cart.filter(product => product.id !== id));
        fetch('http://localhost:8000/products/' + id, {
            method: 'DELETE'
        }).then(res => {
            res.ok && setFetchData(value => !value)
        })
        
    }

    const increase = (id) => {
        const product = cart.find(product => id === product.id);

        const data = {
            ...product,
            count: ++product.count,
            priceTotal: product.price * product.count
        }

        fetch('http://localhost:8000/products/' + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            res.ok && setFetchData(value => !value)
        })
    }
    
    const decrease = (id) => {
        const product = cart.find(product => id === product.id);

        const data = {
            ...product,
            count: product.count > 1 ? --product.count : 1,
            priceTotal: product.price * product.count
        }

        fetch('http://localhost:8000/products/' + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            res.ok && setFetchData(value => !value)
        })
    }  

    const changeValue = (id, value) => {
        const product = cart.find(product => id === product.id);

        const data = {
            ...product,
            count: value,
            priceTotal: product.price * value
        }

        fetch('http://localhost:8000/products/' + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            res.ok && setFetchData(value => !value)
        })
    }

    const addProduct = () => {
        console.log('add product')

        const titles = ["Apple MacBook Air 13", "Apple watch", "mac-pro.jpg"];
        const images = ["macbook.jpg", "apple-watch.jpg", "mac-pro.jpg"];
        const prices = [10000, 19000, 9000, 25000]

        const randomValue = (array) => {
            return array[Math.floor(Math.random() * array.length)]
        }

        const price = randomValue(prices)
        const data = {
            "img": randomValue(images),
            "title": randomValue(titles),
            "count": 1,
            "price": price,
            "priceTotal": price
        }

        fetch('http://localhost:8000/products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            res.ok && setFetchData(value => !value)
        })
    }

    const products = () => {
        return cart.map((product) => {
            return (
                <CartProduct 
                product={product} 
                key={product.id}
            />
            )
        }) }


    return (
        <AppContext.Provider value={{ deleteProduct, increase, decrease, changeValue}}>
            <section className="cart">           
            <CartHeader />
            {cart && products()}
                
            {total && <CartFooter total={total}/>}       
            </section>
            <section className="button-wrapper">
                <Button title='Add Product' onClick={addProduct}/>
            </section>
        </AppContext.Provider>
    );  
}
 
export default Cart;
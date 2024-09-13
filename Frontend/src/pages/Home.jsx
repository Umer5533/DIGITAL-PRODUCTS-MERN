import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard';

const Home = () => {

    const [product, setProduct] = useState();


    useEffect(()=>{
        axios
            .get('http://localhost:3000/product')
            .then((response)=>{
                setProduct(response.data.data)
            })
            .catch((error)=>{console.log(error)})
    },[]);

  return (
    <div className='p-4 max-w-[1300px] mx-auto mt-16'>
        <div className='hero-content text-center'>
            <div className='max-w-md'>
                <h1 className='text-5xl font-bold'>
                    Welcome to <br /> <span className='text-teal-700'>Coding Era</span> 
                </h1>
                <p className='py-6'> We offer high quality online courses for programming and website templates you can buy.</p>
                <a href='/shope' className='btn btn-primary'>Shop</a>
            </div>
        </div>
        
        <ProductCard product={product}/>
    </div>
  )
}

export default Home
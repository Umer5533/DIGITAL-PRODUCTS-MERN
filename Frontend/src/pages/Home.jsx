import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard';

const Home = () => {

    const [product, setProduct] = useState();


    useEffect(()=>{
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`)
            .then((response)=>{
                setProduct(response.data.data)
            })
            .catch((error)=>{console.log(error)})
    },[]);

  return (
    <div  className='p-4  max-w-[1300px] mx-auto mt-40 mb-16'>
        <div  className= ' mb-24'>
            <div className='max-w-md ml-14'>
                <h1 className='text-5xl font-bold'>
                    Welcome to <br /> <span className='text-teal-700'>TechEra</span> 
                </h1>
                <p className='py-6'> We offer high quality online courses for latest tech and website templates you can buy.</p>
                <a href='/shope' className='btn btn-accent'>Shop</a>
            </div>
        </div>
        
        <ProductCard product={product}/>
    </div>
  )
}




export default Home





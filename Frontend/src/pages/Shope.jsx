import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios';

const Shope = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState('');
    const [product, setProduct] = useState([]);

    useEffect(()=>{
        axios
            .get('http://localhost:3000/product')
            .then((response)=>{
                setProduct(response.data.data);
                setFilteredProducts(response.data.data);
            })
            .catch((error)=>{
                console.log(error)
            })
    },[]);

    const filterProducts = ( ) =>{
        if(!Array.isArray(product)){
            console.error("Product is not an array: ", product)
            return;
        }

        let filtered = [...product];

        if (categories !== ''){
            filtered = filtered.filter((product)=> product.categories === categories);
        }

        setFilteredProducts(filtered);
    };

    useEffect(()=>{
        filterProducts();
    }, [product, categories]);
  return (
    <div className="p-4 max-w-[1300px] mx-auto mt-16">
      
      <div className="filters flex justify-between mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>

          <select value={categories} onChange={(e) => setCategories(e.target.value)}
                                   className="select select-bordered w-full max-w-xs">
            <option value="">All</option>
            <option value="course">Courses</option>
            <option value="template">Templates</option>
          </select>

        </div>
      </div>

        <ProductCard product={filteredProducts} />

    </div>
  )
}

export default Shope






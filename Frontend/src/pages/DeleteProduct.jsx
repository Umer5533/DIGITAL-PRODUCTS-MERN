import React, { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const DeleteProduct = () => {
    const [loader, setLoader] =useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();

    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    }

    const handleDeleteProduct = () =>{
        setLoader(true)

        axios
            .delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${id}`, config)
            .then(()=>{
                setLoader(false)
                enqueueSnackbar('Product deleted', {variant: 'success'})
                navigate('/admin')

            })
            .catch((error)=>{
                setLoader(false)
                enqueueSnackbar('Error', {variant: 'error'})
                console.log(error);

            })
    }
  return (
    <div className='p-6  flex justify-center items-center'>
        {loader && <Spinner/>}
    <div className='container bg-base-200 max-w-lg shadow-lg p-5'>
        <Link to="/admin" className=' flex justify-center items-center mb-4 w-12 py-2 px-4
                                      btn  text-sm rounded-xl'>
            Back
        </Link>
        <h2 className='text-2xl mb-4 font-semibold '>
            Are You Sure You Want to Delete This Product?
        </h2>
        <button onClick={handleDeleteProduct} className='bg-red-600 hover:bg-red-800  
                                                            py-2 px-4 rounded-lg w-full'>
            Yes, Delete
        </button>
    </div>
</div>
  )
}

export default DeleteProduct
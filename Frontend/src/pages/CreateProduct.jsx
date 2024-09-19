import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [priceInCents, setPriceInCents] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState("");
    const [img, setImg] = useState(null);

    const [imgPreview, setImgPreview] = useState(null)

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const token = localStorage.getItem('token');
    const config = {
      headers:{
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'application/json'
      }
    }

    const handleFileChange = (e) =>{
        const selectedFile = e.target.files[0];
        setImg(selectedFile);
        if(selectedFile){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);

        }else{
            setImgPreview(null)
        }
    }
 
    const uploadFile = async () =>{
        if (!img){
            enqueueSnackbar('No img selected', {variant: 'warning'})
            return;
        }

        const data = new FormData();
        data.append('file', img);


        try {
            const uploadUrl = (`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/upload-image`);
            const res = await axios.post(uploadUrl, data);

            const {secure_url} = res.data;
            console.log('Uploaded image url', secure_url);
            enqueueSnackbar('Image uploaded successfully', {variant: 'success'});
            return secure_url;
        } catch (error) {
            console.error('Upload error', error);
            enqueueSnackbar('Failed to upload an image', {variant: 'error'})
        }

    }


    const handleSaveProduct = async () => {
        if (!name || !priceInCents || !categories){
                enqueueSnackbar('Please fill all the required fields', {variant: 'warning'});
                return;
        }

        const price = parseInt(priceInCents);
        if (isNaN(price) || price<= 0){
                enqueueSnackbar('Price must be positive number', {variant: 'warning'});
                return;
        }

        setLoader(true)

        try {
            const uploadedImageUrl = await uploadFile();
            if(!uploadedImageUrl){
                throw new Error('Image upload failed');
            }

            const formData = {
                name,
                priceInCents,
                description,
                image: uploadedImageUrl,
                categories
            };

            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`, formData, config)
            enqueueSnackbar('Product saved successfully', {variant: 'success'})
            navigate('/admin');
        } catch (error) {
            console.log('Error: ', error);
            enqueueSnackbar('Error in saving product: ' + (error.response?.data?.message || error.message), {variant: 'error'})
            
        }finally{
            setLoader(false);
        }
    }
  return (
    <div className="p-6  flex justify-center items-center ">
    {loader && <Spinner/>}
  <div className="container max-w-lg shadow-lg rounded-lg p-5 bg-base-300">
    <Link
      to="/admin"
      className="btn flex justify-center items-center  mb-4 w-12 py-2 px-4 text-sm rounded-xl"
    >
      Back
    </Link>
    <h1 className="text-3xl font-semibold my-4 ">
      {" "}
      Create Product
    </h1>
    <div className="my-4">
      <label htmlFor="name" className="block text-md  mb-2">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-base-300 border-gray-400 outline-none px-4 py-2 w-full rounded-md"
      />

      <label htmlFor="priceInCents" className="block text-md  mb-2">
        Price in cents
      </label>
      <input
        id="priceInCents"
        type="number"
        value={priceInCents}
        onChange={(e) => setPriceInCents(e.target.value)}
        className="border border-base-300 border-gray-400 outline-none px-4 py-2 w-full rounded-md"
      />

      <label htmlFor="description" className="block text-md  mb-2">
        Description
      </label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-base-300 border-gray-400 outline-none px-4 py-2 w-full rounded-md"
      />

      <label htmlFor="category" className="block text-lg mb-2 mt-4">
        Category
      </label>
      <select
        id="category"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        className="w-full border border-base-300 border-gray-400 outline-none px-4 py-2 rounded-md"
        required
      >
        <option value="" disabled>
          Select category
        </option>
        <option value="course">Course</option>
        <option value="template">Template</option>
      </select>


      <label htmlFor="img" className="block text-lg   mb-2">
       Upload Image
      </label>
      <input
        id="img"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border w-full border-base-300 border-gray-400 outline-none px-4 py-2 rounded-md"
        required
      />


        {
            imgPreview && (
                <div className="my-4">
                    <img src={imgPreview} alt="Preview" className="max-w-full h-auto" />
                </div>
            )
        }


      <button
        onClick={handleSaveProduct}
        className="w-full bg-green-500
                            hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4"
      >
        Save
      </button>
    </div>
  </div>
</div>
  )
}

export default CreateProduct
import express, { request, response } from "express";
import { Product } from "../Models/productModel.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();



// create new product route
router.post('/', auth, async (request, response) => {
    try {
        if (!request.body.name||
            !request.body.priceInCents ||
            !request.body.image ||
            !request.body.categories
        ) {
            return response.status(400).send({message: 'Required Fields are missing'})
        }

        const newProduct = {
            name: request.body.name,
            priceInCents: request.body.priceInCents,
            description: request.body.description,
            image: request.body.image,
            categories: request.body.categories
        }

        const product = await Product.create(newProduct);
        return response.status(201).send(product)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// get all product route

router.get('/', async (request, response) => {
    try {
        const allProduct = await Product.find({});

        return response.status(200).json({
            data: allProduct
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})



// get a single product 

router.get('/:id', async (request, response) =>{
    try {
        const {id} = request.params;
        const singleProduct = await Product.findById(id);

        response.status(200).json(singleProduct);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
        
    }
})


// delete product route

router.delete('/:id', auth, async (request, response) => {
    try {
        const {id} = request.params;
        const delProduct = await Product.findByIdAndDelete(id);

        if(!delProduct) {
           return response.status(404).json({
            message: 'Product not found'
           })

        }
    
        response.status(200).json({message: "Product delete successfully", deletedItems: delProduct})

        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})



// update route product 

router.put('/:id', auth , async (request, response) => {
    try {
        if(!request.body.name ||
            !request.body.priceInCents ||
            !request.body.categories
        ){
return response.status(400).send({message: "Required fields are missings."})
        }

        const {id} = request.params;
        const updateProduct = await Product.findByIdAndUpdate(id, request.body, {new:true})
        if(!updateProduct){
            return response.status(404).json({message:"Product not found"})
        }

        return response.status(200).send({message: 'Product Updated'})
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }


})





export default router;
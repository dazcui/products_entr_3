const { response } = require("express");
const productsControllers = require("./products.controllers");

const getAllProducts = (req, res) => {
    productsControllers
    .getAllProducts()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const postProduct = (req, res) => {
  const data = req.body;
  if (data.name && data.category && data.price && data.isAvailable) {
    productsControllers.createProduct(data)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(400).json({ message: err.message })
      })
  } else {
    res.status(400).json({ message: 'Missing data' })
  }
};

const getProductById = (req, res) => {
  const id = req.params.id;

  productsControllers.getProductById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      }else{
        res.status(404).json({ message: 'Invalid ID' })
      }      
    })
    .catch(err => {
      res.status(404).json({ message: err.message })
    })
}

// //? modificacion parcial
const patchProduct = (req, res) => {
  const id = req.params.id
  const { name, category, price, isAvailable } = req.body
  productsControllers.editProduct(id, { name, category, price, isAvailable })
    .then((response) => {
      if (response[0]) {
        res.status(200).json({
          message: `User with id ${id}, edited succesfully!`
        })
      }else{
        res.status(400).json({ message: 'Invalid ID'})
      }
    })
    .catch(error => {
      res.status(400).json({ message: error.message })
    })
}


const deleteProduct = (req,res)=> {
  const id = req.params.id
  productsControllers.deleteProduct(id)
  .then((response)=>{
    if (response) {
      req.status(204).json()
    }else{
      res.status(400).json({message: 'Invalid ID'})
    }
  })
  .catch(err=>{
    res.status(400).json(err)
  })
}

const putProduct = ( req, res ) => {
  const id = req.params.id;
  const {name, category, price, isAvailable} = req.body
  if(name && category && price && isAvailable){
    productsControllers.editProduct(id, {name, category, price, isAvailable})
      .then((response) => {
        if(response[0]){
          res.status(200).json({message: `Product with ID: ${id}, edited succesfully!`})
        } else {
          res.status(404).json({message: 'Invalid ID'})
        }
      })
      .catch(err => {
        res.status(400).json({message: err.message})
      })
  } else {
    res.status(400).json({message: 'Missing data', fields : {
      name: 'string',
      category: 'string',
      price: 'integer',
      isAvailable: 'boolen'
    }})
  }
}


module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    patchProduct,
    deleteProduct,
    putProduct
}
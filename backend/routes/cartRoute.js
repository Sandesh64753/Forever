import express from 'express'
import { addToCart, updateCart, getCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.get('/get', authUser, getCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.put('/update', authUser, updateCart)

export default cartRouter
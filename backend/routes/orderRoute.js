import express from 'express'
import orderController from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const { placeOrder, placeOrderStripe, allOrder, userOrders, updateStatus, verifyStripe, stripeWebhook } = orderController
const orderRouter = express.Router()

// Admin 
orderRouter.post('/list', adminAuth, allOrder)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)

// User
orderRouter.post('/userorders', authUser, userOrders)

// Verify Stripe
orderRouter.post('/verifyStripe', authUser, verifyStripe)

// Webhook - No auth needed for Stripe
orderRouter.post('/stripeWebhook', stripeWebhook)

export default orderRouter
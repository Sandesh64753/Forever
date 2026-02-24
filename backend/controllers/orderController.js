import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

// Global Variables
const currency = 'inr'
const deliveryCharge = 10

// GAteway Initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using Cash on Delievery method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed' })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            metadata: { orderId: newOrder._id.toString() },
            line_items,
            mode: "payment",
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Verify Stripe
const verifyStripe = async (req, res) => {
    const { orderId, success } = req.body
    const userId = req.body.userId  // Set by authUser middleware

    try {

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// All order data for adin panel
const allOrder = async (req, res) => {

    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// User order data for Frontend
const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// Update Order Status from admin panel
const updateStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
// Stripe webhook to securely confirm payment
const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature']

    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            const orderId = session.metadata?.orderId
            if (orderId) {
                await orderModel.findByIdAndUpdate(orderId, { payment: true })
            }
        }

        res.status(200).send('Received')
    } catch (error) {
        console.log('Webhook error:', error.message)
        res.status(400).send(`Webhook Error: ${error.message}`)
    }
}

export default {
    placeOrder,
    placeOrderStripe,
    allOrder,
    userOrders,
    updateStatus,
    verifyStripe,
    stripeWebhook
}
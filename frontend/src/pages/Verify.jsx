import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()

    const [status, setStatus] = useState('checking')
    const attemptsRef = useRef(0)

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    // Call verifyStripe endpoint to confirm payment
    const verifyPayment = async () => {
        if (!token) {
            setStatus('login')
            return
        }

        try {
            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe',
                { orderId, success },
                { headers: { token } }
            )

            if (response.data.success) {
                setStatus('success')
                setCartItems({})
                setTimeout(() => navigate('/orders'), 2000)
            } else {
                setStatus('failed')
                setTimeout(() => navigate('/cart'), 2000)
            }

        } catch (error) {
            console.log('Verify payment error:', error.message)
            setStatus('failed')
            toast.error('Failed to verify payment')
            setTimeout(() => navigate('/cart'), 2000)
        }
    }

    useEffect(() => {
        if (!token) {
            setStatus('login')
            return
        }

        if (success && orderId) {
            verifyPayment()
        } else {
            setStatus('invalid')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, success, orderId])

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className='text-center'>
                {status === 'checking' && <p className='text-lg'>Processing payment, please wait...</p>}
                {status === 'success' && <p className='text-lg text-green-600'>Payment confirmed — redirecting to orders...</p>}
                {status === 'failed' && <p className='text-lg text-red-600'>Payment failed. Redirecting to cart...</p>}
                {status === 'login' && <p className='text-lg text-red-600'>Please log in to verify your order.</p>}
                {status === 'invalid' && <p className='text-lg text-red-600'>Invalid payment parameters.</p>}
            </div>
        </div>
    )
}

export default Verify

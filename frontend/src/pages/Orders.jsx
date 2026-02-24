import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadOrderData = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Fetching orders with token:', token)
      if (!token) {
        setError('No token found. Please log in.')
        setLoading(false)
        return null
      }

      console.log('Calling /api/order/userorders')
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      console.log('Response:', response.data)

      if (response.data.success) {
        if (!response.data.orders || response.data.orders.length === 0) {
          console.log('No orders found')
          setOrderData([])
          setLoading(false)
          return
        }

        let allOrdersItem = []

        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })

        setOrderData(allOrdersItem.reverse())
        setLoading(false)
      } else {
        setError(response.data.message || 'Failed to load orders')
        setLoading(false)
      }

    } catch (error) {
      console.error('loadOrderData error:', error)
      setError(error.message || 'Error loading orders')
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {loading && <p className='text-center py-8'>Loading orders...</p>}
      {error && <p className='text-center py-8 text-red-600'>Error: {error}</p>}
      {!loading && !error && orderData.length === 0 && <p className='text-center py-8'>No orders found.</p>}

      <div>
        {!loading && !error &&
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity :{item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>
                  Track Order
                </button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders

import React from 'react'
import { useSelector } from 'react-redux'

const Orderpage = () => {
    const order = useSelector(order)
  return (
    <div>Orderpage</div>
  )
}

export default Orderpage
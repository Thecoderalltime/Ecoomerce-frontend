import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import CategoryPage from '../Components/CategoryPage/CategoryPage'

const HomePage = () => {
  return (
    <div>
      <Navbar>
       <CategoryPage/>
      </Navbar>
    </div>
  )
}

export default HomePage
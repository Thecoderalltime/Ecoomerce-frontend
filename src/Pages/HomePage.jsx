import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import CategoryPage from '../Components/CategoryPage/CategoryPage'
import Footer from '../Components/footer/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar>
       <CategoryPage/>
       <Footer/>
      </Navbar>

    </div>
  )
}

export default HomePage
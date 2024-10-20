import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BookList from '../components/home/BookList'
import { sorted } from '../features/filter/filterSlice'

const Home = () => {
  const dispatch = useDispatch()
  const [isFeatured, setIsFeatured] = useState(false)
  const handleSort = (e) => {
    if (e.target.value === 'all') {
      dispatch(sorted(e.target.value))
      setIsFeatured(false)
    } else {
      dispatch(sorted(e.target.value))
      setIsFeatured(true)
    }
  }
  return (
    <main className='py-12 px-6 2xl:px-6 container'>
      <div className='order-2 xl:-order-1'>
        <div className='flex items-center justify-between mb-12'>
          <h4 className='mt-2 text-xl font-bold'>Book List</h4>

          <div className='flex items-center space-x-4'>
            <button
              className={`lws-filter-btn ${!isFeatured && 'active-filter'}`}
              value={'all'}
              onClick={handleSort}
            >
              All
            </button>
            <button
              className={`lws-filter-btn ${isFeatured && 'active-filter'}`}
              value={'featured'}
              onClick={handleSort}
            >
              Featured
            </button>
          </div>
        </div>
        <BookList />
      </div>
    </main>
  )
}

export default Home

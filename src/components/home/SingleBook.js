import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  addToWishlist,
  removeFromWishlist,
} from '../../features/wishlists/wishlistSlice'
const SingleBook = ({ book }) => {
  const { id, title, authors, formats, subjects } = book
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist.wishlist)
  const toggleWishlist = (bookId) => {
    if (wishlist.includes(bookId)) {
      dispatch(removeFromWishlist(bookId))
    } else {
      dispatch(addToWishlist(bookId))
    }
  }
  return (
    <div className='book-card p-4'>
      <img
        className='h-[240px] w-[170px] object-cover'
        src={formats['image/jpeg']}
        alt='book'
      />
      <div className='flex-1 h-full flex flex-col'>
        <div className='flex items-center justify-between'>
          <p className='lws-author'>{id}</p>
          <span
            onClick={() => toggleWishlist(book.id)}
            className='block cursor-pointer text-xl'
          >
            {wishlist.includes(book.id) ? '❤️' : '♡'}
          </span>
        </div>

        <div className='space-y-2 h-full'>
          <h4 className='lws-book-name'>{title}</h4>
          {authors.map((author, index) => (
            <p className='lws-author' key={index}>
              {author.name}
            </p>
          ))}
          <div className='flex flex-wrap'>
            {subjects.map((subject, index) => (
              <p className='lws-badge' key={index}>
                {subject}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBook

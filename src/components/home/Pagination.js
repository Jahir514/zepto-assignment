import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = []
  const maxButtons = 8
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2))
  let endPage = Math.min(startPage + maxButtons - 1, totalPages)

  // Adjust start and end if necessary
  if (endPage - startPage < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className='pagination'>
      <button
        className='pagination__button'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination__button ${
            number === currentPage ? 'active' : ''
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className='pagination__button'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination

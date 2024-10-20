import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Pagination from './Pagination'
import { useGetBooksQuery } from '../../features/api/apiSlice'
import SingleBook from './SingleBook'

const BookList = () => {
  const [page, setPage] = useState(1)
  const { sortedByFeature, searchBy } = useSelector((state) => state.filter)
  const {
    data: books,
    isError,
    isFetching,
    refetch,
  } = useGetBooksQuery(page, { skip: false })

  useEffect(() => {
    refetch()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page, refetch])
  // decide what to render
  let content = null
  if (isFetching) {
    content = (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  }

  if (!isFetching && isError) {
    content = <div>There was an error</div>
  }

  if (!isFetching && !isError && books?.results?.length === 0) {
    content = <div>No Books Found</div>
  }
  let totalPages = 0

  if (!isFetching && !isError && books?.results?.length > 0) {
    totalPages = Math.ceil(books.count / 10)
    if (searchBy !== '') {
      if (sortedByFeature) {
        content = books.results
          .filter(
            (book) =>
              book.featured === true &&
              book.title.toLowerCase().includes(searchBy.toLowerCase())
          )
          .map((book) => <SingleBook key={book.id} book={book} />)
      } else {
        content = books.results
          .filter((book) =>
            book.title.toLowerCase().includes(searchBy.toLowerCase())
          )
          .map((book) => <SingleBook key={book.id} book={book} />)
      }
    } else {
      if (sortedByFeature) {
        content = books.results
          .filter((book) => book.featured === true)
          .map((book) => <SingleBook key={book.id} book={book} />)
      } else {
        content = books.results.map((book) => (
          <SingleBook key={book.id} book={book} />
        ))
      }
    }
  }
  return (
    <>
      <div
        className={`space-y-6 md:space-y-0 md:grid grid-cols-1 ${
          isFetching ? 'lg:grid-cols-1' : 'lg:grid-cols-3'
        } gap-6`}
      >
        {content}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  )
}

export default BookList

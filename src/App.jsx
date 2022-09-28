import React, { useState } from 'react'
import useFetch from './useFetch'

const App = () => {
  const [page, setPage] = useState(1)

  const { loading, error, data } = useFetch(`https://randomuser.me/api/?results=50&seed=abc`)
  console.log({ loading, error, data });

  const PER_PAGE = 10;
  const total = data?.results?.length;
  const pages = Math.ceil(total / PER_PAGE);

  const skip = page * PER_PAGE - PER_PAGE;

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && error) {
    return <div>Error</div>
  }


  return (
    <div className='App'>
      <h1 className='title'>List Of Users</h1>
      {data?.results.slice(skip, skip + PER_PAGE).map((each, index) => {
        const name = `  ${each.name.title} ${each.name.first} ${each.name.last}`;
        return (
          <li key={name.toLowerCase().replaceAll(' ', '')}>{`${index + 1}.${name}`}</li>
        );
      })}
      {
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
      }
      <p className='pagination'>
        Pages: {page} of {pages}
      </p>
      {
        <button
          disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      }
      {
        Array.from({ length: pages }, (_, index) => index + 1).map((each) => (
          <button
            onClick={() => setPage(each)}>{each}</button>
        ))}
    </div>
  )
}

export default App
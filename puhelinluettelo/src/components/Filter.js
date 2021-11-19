import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <>
      Filter with name <input value={filter} onChange={handleFilterChange} />
    </>
  )
}

export default Filter

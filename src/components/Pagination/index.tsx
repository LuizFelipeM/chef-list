import React, { useEffect, useState } from 'react'
import { PaginationLink } from '../PaginationLink'

interface PaginationProps {
  firstPage: number
  currentPage: number
  lastPage: number
  onPageChange?: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ firstPage, currentPage, lastPage, onPageChange }) => {
  const [middlePaginationValues, setMiddlePaginationValues] = useState({ left: 1, middle: 2, right: 3 })

  useEffect(() =>
    setMiddlePaginationValues({
      left: leftPageValue(currentPage),
      middle: middlePageValue(currentPage),
      right: rightPageValue(currentPage)
    }), [currentPage])

  const leftPageValue = (currPage: number) => {
    switch (currPage) {
      case firstPage:
        return currPage + 1
      case firstPage + 1:
        return currPage
      case lastPage:
      case lastPage - 1:
        return lastPage - 3
      default:
        return currPage - 1
    }
  }

  const middlePageValue = (currPage: number) => {
    switch (currPage) {
      case firstPage:
        return currPage + 2
      case firstPage + 1:
        return currPage + 1
      case lastPage:
      case lastPage - 1:
        return lastPage - 2
      default:
        return currPage
    }
  }

  const rightPageValue = (currPage: number) => {
    switch (currPage) {
      case firstPage:
        return currPage + 3
      case firstPage + 1:
        return currPage + 2
      case lastPage:
      case lastPage - 1:
        return lastPage - 1
      default:
        return currPage + 1
    }
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a className="pagination-previous" onClick={() => onPageChange?.(currentPage - 1)}>Previous</a>
      <a className="pagination-next" onClick={() => onPageChange?.(currentPage + 1)}>Next page</a>
      <ul className="pagination-list">
        <li>
          <a
            className={`pagination-link ${currentPage === firstPage ? 'is-current' : ''}`}
            aria-label={`Goto page ${firstPage}`}
            onClick={() => onPageChange(firstPage)}
          >
            {firstPage}
          </a>
        </li>

        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <PaginationLink
          page={middlePaginationValues.left}
          isCurrent={currentPage === middlePaginationValues.left}
          onClick={onPageChange}
        />
        <PaginationLink
          page={middlePaginationValues.middle}
          isCurrent={currentPage === middlePaginationValues.middle}
          onClick={onPageChange}
        />
        <PaginationLink
          page={middlePaginationValues.right}
          isCurrent={currentPage === middlePaginationValues.right}
          onClick={onPageChange}
        />
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>

        <li>
          <a
            className={`pagination-link ${currentPage === lastPage ? 'is-current' : ''}`}
            aria-label={`Goto page ${lastPage}`}
            onClick={() => onPageChange?.(lastPage)}
          >
            {lastPage}
          </a>
        </li>
      </ul>
    </nav>
  )
}

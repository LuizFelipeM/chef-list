import React from 'react'

interface PaginationLinkProps {
  page: number
  isCurrent?: boolean
  onClick?: (page: number) => void
}

export const PaginationLink: React.FC<PaginationLinkProps> = ({ page, isCurrent, onClick }) => {
  return (
    <li>
      <a
        className={`pagination-link ${isCurrent ? 'is-current' : ''}`}
        aria-label={`Goto page ${page}`}
        onClick={(e) => {
          e.preventDefault()
          onClick(page)
        }}
      >
        {page}
      </a>
    </li>
  )
}

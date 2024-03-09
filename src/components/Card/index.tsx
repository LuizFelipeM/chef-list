import React from 'react'
import { routes } from "@Chef/utility"
import "./card.css"

interface CardProps {
  id: number
  image: string
  title: string
  score: number
  summary: string
  tags: string[]
}

export const Card: React.FC<CardProps> = ({ id, image, title, score, summary, tags }) => (
  <div className="card">
    <div className="card-image">
      <a href={`${routes.RECIPE.replace(":id", id)}`}>
        <figure className="image is-4by3">
          <img src={image} alt={`${title} image`} />
        </figure>
      </a>
    </div>
    <div className="card-content">
      <a className="title is-4 two-lines" href={`${routes.RECIPE.replace(":id", id)}`}>
        {title}
      </a>

      <div className="content">
        <div className="columns is-gapless m-0">
          {(new Array(5).fill(null)).map((_, i, arr) => (
            <span key={`${id}-${i}`}>
              <i className={i + 1 < arr.length * score ?
                "fa-solid fa-star" :
                score % 1 >= 0.5 ?
                  "fa-regular fa-star-half-stroke" :
                  "fa-regular fa-star"}
              />
            </span>)
          )}
        </div>
        <p dangerouslySetInnerHTML={{ __html: summary }} className="three-lines" />
        <div className="tags">
          {tags.map((tag, i) => <span key={i} className="tag is-light">{tag}</span>)}
        </div>
      </div>
    </div>
  </div>
)
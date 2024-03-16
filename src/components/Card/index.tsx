import React, { useEffect, useRef } from 'react'
import { Card as VanillaCard } from "@Chef/styleguide";
import { mountParcel } from '../../Chef-search';

interface CardProps {
  title: string
  className?: string
  tags: string[]
  summary: string
  stars: string[]
  image: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const Card: React.FC<CardProps> = (props) => {
  const cardRef = useRef(null)

  useEffect(() => {
    mountParcel(VanillaCard, {
      domElement: cardRef.current,
      ...props
    });
  }, [])


  return (
    <div ref={cardRef} />
  )
}

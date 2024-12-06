import React, { useEffect, useRef, useState } from "react"
import "./TitleCards.css"
import cards_data from "./../../assets/cards/Cards_data"
import { Link } from "react-router-dom"

const TitleCards = ({ title, category }) => {
  const API_KEY = import.meta.env.VITE_API_KEY

  const [apiData, setapiData] = useState([])

  const cardsRef = useRef()

  const handleWheel = e => {
    e.preventDefault()
    cardsRef.current.scrollLeft += e.deltaY
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        if (res && res.results) {
          console.log("API Response:", res)
          setapiData(res.results)
        } else {
          console.error("Unexpected API response:", res) / setapiData([])
        }
      })
      .catch(err => console.error("Error fetching data:", err))

    cardsRef.current.addEventListener("wheel", handleWheel)
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className='card' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt={card.name} />
              <p>{card.title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards

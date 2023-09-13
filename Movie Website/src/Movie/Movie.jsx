import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import './Movie.css';
import Footer from '../Footer/Footer';

export default function Movie() {
    const [movieDetails, setMovieDetails]=useState([]);
    const {id}=useParams();
    console.log(id);
    console.log(movieDetails);
    const movieImg="https://image.tmdb.org/t/p/original/" + movieDetails.backdrop_path;
    const posterImg="https://image.tmdb.org/t/p/original/"+movieDetails.poster_path;
    console.log(movieImg);
  

    const findMovieDetails=()=>{
      fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key=47d43146cb734eaca74e3fc23d4126e2')
      .then(res=>res.json())
      .then(data=>setMovieDetails(data));
      window.scrollTo(0,0);
    }
    useEffect(()=>findMovieDetails(),[]);


  return (
    <div>
    <div className="heroMovie"><img src={movieImg}/></div>

    <div className='movieDetails'>
      <div className="imgContainer">
        <img src={posterImg}/>
      </div>
      <div className="detailsContainer">
        <h2>{movieDetails.original_title}</h2>
        <p>{movieDetails.tagline}</p>
        <p>{movieDetails.vote_average}</p>
        <p>{movieDetails.release_date}</p>
        <div className='movieGenreContainer'>{movieDetails.genres?.map(genre=>(<span className='movieGenre'>{genre.name}</span>))}</div>
        <h3 className='Summary'>Summary</h3>
        <p>{movieDetails.overview}</p>
        <div className='websites'><a href={movieDetails.homepage} target="_blank"><div className='website'>Website</div></a><a href={"https://www.imdb.com/title/"+movieDetails.imdb_id} target="_blank"><div className='imdb'>iMDb</div></a></div>
        
      </div>
      
    </div>
    
    
    </div>
  )
}

import React from 'react'
import './HomePage.css'
import darkKnight from './darkKnight.jpg'
import darkSmall from './darkSmall.jpg'
import johnSmall from './johnSmall.jpg'
import avSmall from './avSmall.jpg'
import johnWick from './johnWick.jpg'
import theAvengers from './theAvengers.jpg'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar, Autoplay} from 'swiper/modules';
import 'swiper/css';
import { useEffect } from 'react'
import { useState } from 'react'
import 'swiper/css/effect-fade';  
//import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
//import 'swiper/css/autoplay';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { menuContext } from '../Contexts/Contexts';
import Footer from '../Footer/Footer';


export default function HomePage() {
    const {menuStatus, setMenuStatus}=useContext(menuContext);
    const getMovies = (type)=>{
      fetch("https://api.themoviedb.org/3/movie/"+type+"?api_key=47d43146cb734eaca74e3fc23d4126e2")
      .then(res=>res.json())
      .then(data=>setMovieList(data.results));
      if(type==="now_playing"){
        setMenuStatus("1");
      }
      if(type==="popular"){
        setMenuStatus("2");
      }
      if(type==="top_rated"){
        setMenuStatus("3");
      }
      if(type==="upcoming"){
        setMenuStatus("4");
      }
    }
    const checkMenu=()=>{
      if (menuStatus==="4"){
        getMovies("upcoming");
      }
    }
    useEffect(()=>{getMovies("now_playing")}, []);
    useEffect(()=>{checkMenu()}, [menuStatus]); //when i change menustatus from navbar with context api it doesnt invoke the fetch function so we did this line to check
    const [movieList, setMovieList]=useState([]);
    //const [menuStatus, setMenuStatus]=useState("1");
    console.log("hey",movieList);

    const Movies = [{movieName: "Avengers",
    movieDesc:"The Avengers is a 2012 American superhero film based on the Marvel Comics superhero team of the same name. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures.",
  movieAwards:"4",
movieNom:"15",
movieImg:"heroContainerAv",
moviePos:avSmall,},
      {movieName: "Dark Knight",
    movieDesc:"The Dark Knight Rises is considered to be one of the best superhero films ever made. It was nominated for eight Academy Awards, including Best Picture, Best Director, and Best Supporting Actor for Hardy.",
  movieAwards:"3",
movieNom:"9",
movieImg:"heroContainerDark",
moviePos:darkSmall,},
{movieName: "John Wick",
    movieDesc:"John Wick is a retired hitman who is forced to come out of retirement when his beloved puppy is killed by Russian mobsters. He sets out on a bloody revenge quest, taking down anyone who gets in his way.",
  movieAwards:"5",
movieNom:"12",
movieImg:"heroContainerJohn",
moviePos:johnSmall,}
]


  SwiperCore.use([Navigation,Pagination,Scrollbar,EffectFade, Autoplay]);
  return (
    <div>
    <Swiper 
    modules={[EffectFade]} effect="fade"
      /*navigation={{nextEl:'.swiper-button-next',
                   prevEl:'.swiper-button-prev',
                   clickable:true,
                  }}*/
      pagination={{clickable: true }}
      //scrollbar={{ draggable: true }}
      spaceBetween={0}
      autoplay={{delay:5000}}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}>
      

    {Movies.map((Movie)=>(<SwiperSlide>
    <div className={Movie.movieImg}>
        <div className='leftHero'><h1>{Movie.movieAwards}</h1><p>ACADEMY AWARDS</p><h1>{Movie.movieNom}</h1><p>ACADEMY AWARDS NOMINATIONS</p></div>
        <div className='rightHero'>
            <div className='innerRightHero'><h2>{Movie.movieName}</h2><p>{Movie.movieDesc}</p>
            <div className='line'></div>
            <div className="trailer"><img className="imgTrailer" src={Movie.moviePos}/><PlayCircleOutlinedIcon fontSize='large'/><p>WATCH TRAILER</p></div>
            </div>
            
        </div>
    </div>
    </SwiperSlide>))}
    </Swiper>
    <div id="movies" name="movies" className='movieMenu'><span className={menuStatus==="1"?"activeMenu" : ""} onClick={()=>getMovies("now_playing")}>Featured</span><span className={menuStatus==="2"?"activeMenu" : ""} onClick={()=>getMovies("popular")}>POPULAR</span><span className={menuStatus==="3"?"activeMenu" : ""} onClick={()=>getMovies("top_rated")}>TOP RATED</span><span className={menuStatus==="4"?"activeMenu" : ""} onClick={()=>getMovies("upcoming")}>UPCOMING</span></div>
    <div className='moviesContainer'>
    {movieList.map((movie)=><Link to={"movie/"+movie.id}><div className='movieCard'><img className="imgPosters" src= {'https://image.tmdb.org/t/p/w500'+movie.poster_path}/><h5>{movie.original_title}</h5></div></Link>)}
    </div>
    
    </div>
  )
}

import React from 'react'
import './Navbar.css'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Link as ScrollDown } from 'react-scroll';
import {Link as ReactNav} from 'react-router-dom';
import { useContext } from 'react';
import { menuContext } from '../Contexts/Contexts';

export default function Navbar() {
  const[expand,setExpand]=useState("shrinkIt");
  const{setMenuStatus}=useContext(menuContext);
  const [activeState, setActiveState]=useState('');
  const changeActive=()=>{
    if(activeState==='active'){
      setActiveState('');
    }
    else{
      setActiveState('active');
    }
  }

  return( 
    <>
<div className="navbar-container">
<ReactNav className='logoStyle' to='/'>MOVIE LOUNGE</ReactNav>
  <div><ul><ReactNav to='/'><li>Home</li></ReactNav><ScrollDown to="movies"><li>Movies</li></ScrollDown><ScrollDown to='movies'><li onClick={()=>setMenuStatus("4")}>Upcoming</li></ScrollDown></ul></div>
  <div className="rightNav">
    <div className='Search'><SearchIcon onClick={()=>{expand==="expandIt" ? setExpand("shrinkIt"): setExpand("expandIt")}}  fontSize="small" /><input className={expand} type="text" ></input></div>
    <div className='icons'><FacebookRoundedIcon className='iconAnim' fontSize="small"/><TwitterIcon className='iconAnim' fontSize="small"/><InstagramIcon className='iconAnim' fontSize="small"/></div>
  </div>
  {console.log(expand)}
</div>
<nav class="navbar">
        <ReactNav className='logoStyle' to='/'>MOVIE LOUNGE</ReactNav>
        <ul  onClick={()=>changeActive()} class={"nav-menu "+activeState}>
          <li class="nav-item">
          <ReactNav to='/'>Home</ReactNav>
          </li>
          <li class="nav-item">
          <ScrollDown to="movies">Movies</ScrollDown>
          </li>
          <li  class="nav-item">
          <ScrollDown onClick={()=>setMenuStatus("4")} to="movies">Upcoming</ScrollDown>
          </li>
         
        </ul>
        <div onClick={()=>changeActive()} class={"hamburger "+activeState}>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </nav>

      </>
        );
}

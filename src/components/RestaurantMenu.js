import React from 'react'
import { useEffect } from 'react';

const RestaurantMenu = () => {

  useEffect(()=>{
    fetchMenu();
  },[]);

  const fetchMenu = async ()=> {
    const data = await fetch("")
  }

  return (
    <div className="menu">
      <h1>Name of the Restaurent</h1>
      <h2>Menu</h2>
      <ul>
        <li>Biriyani</li>
        <li>Burgers</li>
        <li>Diet Coke</li>
      </ul>
    </div>
  );
}

export default RestaurantMenu

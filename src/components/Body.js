import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useState , useEffect } from "react";
import Shimmer from "./Shimmer"


const Body = () => {
    const [ListOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText , setSearchText] = useState("")

    useEffect(()=>{
      fetchData();
    },[]);

    const fetchData = async ()=>{
      try {
        const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.91850&lng=76.25580&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();
        console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);

        setListOfRestaurants(
          json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }


  return ListOfRestaurants.length === 0 ? (
    <>
      <Shimmer />
    </>
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" className="search-box" value ={searchText} onChange={(e)=>{
            setSearchText(e.target.value);
          }}/>
          <button onClick={()=>{
            const filteredList = ListOfRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setListOfRestaurants(filteredList);

          }}>Search</button>

          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = ListOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              console.log(filteredList);
              setListOfRestaurants(filteredList);
            }}
          >
            Top Rated Restaurent
          </button>
        </div>
      </div>
      <div className="res-container">
        {ListOfRestaurants.length > 0 &&
          ListOfRestaurants.map((restaurant) => {
            return (
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            );
          })}
      </div>
    </div>
  );
};

export default Body;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Slider/Slider.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../ProductsPage/ProductsPage.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import React from "react";

const WishList = () => {
  const { state } = useLocation();
  const [products,setProducts]=React.useState([]);
  const his = useNavigate();

  ///////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const getProducts = async () => {
      try {
        const dataRes = await fetch(`http://localhost:1444/api/v1/labtops`);
        const { data } = await dataRes.json();
        console.log("products", data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [ his]);

  ///////////////////////////////////////////////////////////////////////////////////////
  return (<div className="proPage">
    <h3>
      {" "}
      <span>Your WishList</span>
    </h3>
    <div className="showproducts">
      {products.map((product, index) => (
        <div
          className="slider-card"
          key={index}

        >
          <div
            className="slider-card-image"
            onClick={(e) => {
              his(`/product/${product.pid}`, { state: state });
            }}
            style={{
              backgroundImage: `url(${product.img_link})`,
              backgroundSize: "cover",
            }}
          ></div>
          <p onClick={(e) => {
            his(`/product/${product.pid}`, { state: state });
          }} className="slider-card-title">{product.product_name}</p>
          <Rating
            className="slider_rating"
            name="half-rating-read"
            defaultValue={product.p_value}
            precision={0.5}
            size="small"
            readOnly
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="slider-card-price">{product.price}$</p>
          </div>
        </div>
      ))}
    </div>
  </div> );
}
 
export default WishList;
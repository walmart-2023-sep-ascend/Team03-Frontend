import React from "react"
import axios from 'axios';
import { useState,useEffect } from 'react';
import "./css/AddCart.css"
import { isDisabled } from "@testing-library/user-event/dist/utils";

function AddCart(props){

    const [error,setError] = useState(null);
    const [addSuccess,setAddSuccess] = useState(null);

   let quantity=getQuantity(props);

    
    console.log("quantity is "+quantity);
    
    const buttonText= ()=>{
        console.log("Button TXT Calling");
        if(quantity > 0){
            return quantity
            }
            else{
            return "Add to Cart";
            } 
    }

     const  addItemToCart = async (qty)=>{
        console.log("AddToCart QTY "+qty)

        setError(null);
        setAddSuccess(null);
        let newCart = {

            "userId":props.cart.userId,
            "products":[

                props.cart.products.map((product)=>{

                    if(product.id===props.prodId){
                       const updatedProd={
                            "id":product.id,
                            "quantity":product.quantity+qty
                        }
                        return updatedProd;
                    }
                    else
                        return product;


                })

            ]
        };


        try{
       await axios.post("https://dummyjson.com/carts/add", newCart).then((response) => {
      console.log(response.status, response.data.token);
      setAddSuccess(true);
    });



        props.handleCount();
        if(qty==0){
            console.log("Called AddToCart")
    }
    else {
        quantity=quantity+qty;
    }
    console.log("QUANTITY AFTER CALL "+quantity)
    setError(null);
}
catch(error){
    setError(error);
}
    }

    function getQuantity(props){

        const prodId=props.prodId
    
        const cart = props.cart
        const products = cart.products
        console.log("Products in addcart "+products)
        let quantityVal=0 ; 
        
        products.map((product) => {
            if(product.id==prodId)         
            {
                
                quantityVal = product.quantity 
            }
        })
        return quantityVal
    }
    
    

    return (
        <div>
        <div className={props.disableButton===true?"addCartDiv2":"addCartDiv1"}>
            <button type="button"  className={props.disableButton===true?"addCartButtonDis":"addCartButton"} onClick={()=>{addItemToCart(-1);}} disabled={props.disableButton}>-</button> 
                         &nbsp; {buttonText()} &nbsp;   
            <button type="button"  className={props.disableButton===true?"addCartButtonDis":"addCartButton"}  onClick={()=>{addItemToCart(1);} } disabled={props.disableButton}>+</button>
        </div>

        {(error!==null)?<div className="hideMe"><p style={{color:"red", fontWeight:"bold", fontSize:"10px"}}>Error while adding to cart</p></div>:' '}
        {(addSuccess===true)?<div className="hideMe"><p style={{color:"green", fontWeight:"bold", fontSize:"10px"}}>Added successfully to cart!</p></div>:' '}

        </div>
    )

}



export default AddCart;
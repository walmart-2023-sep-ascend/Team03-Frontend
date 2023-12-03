import React, { useState, useEffect } from "react"
import "./css/ProductComparison.css"
import axios from 'axios';
import UserReviews from "./UserReviews";
import ProductPrice from "./ProductPrice";



function ProductComparison(props){

    const [relatedProds,setRelatedProds] = useState();
    const [isProdCompLoaded,setIsProdCompLoaded] = useState(false);
    const [error,setError] = useState(null);


    const getStar=(avgRating)=>{
        let avgRatingComponent = [];
  
        const avgRatingInt = Math.round(avgRating);
  
        for (let i = 1.0; i <= avgRatingInt; i++) {
        avgRatingComponent.push(<span className="fa fa-star checked"></span>);
        }
    
        for (let i = 5 - avgRatingInt; i >= 1; i--) {
        avgRatingComponent.push(<span className="fa fa-star"></span>);
        //avgRatingComponent=avgRatingComponent+<span className="fa fa-star"></span>
        }
  
        return avgRatingComponent;
    }




    const getRelatedProducts= async(category) => {
        console.log("Going to call related Products "+relatedProds);
      //  const resp = await axios.get(`https://api.npoint.io/ce39eb17c36a0f1ed9e5?category=`+category);
        try{
      //  const resp = await axios.get(`http://localhost:8080/api/products/getByText/`+category);
      const resp = await axios.get(`http://proddetails.eastus.cloudapp.azure.com:9200/api/products/getByText/`+category);  
      
      const  data = resp.data;
        
        const filteredData = data.filter((item) => item.id !== props.currProd.id);

        setRelatedProds( filteredData);
    //  console.log("Rltd PRODUCTS "+data[0].brand);
        setIsProdCompLoaded(true);
        }
        catch(error){
            //console.log("Caught Error");
            setError(error);
        }
    };

    useEffect(() => {
        setIsProdCompLoaded(false)
         if(isProdCompLoaded===false) {
            getRelatedProducts(props.currProd.productCategory)
        }
  }, []);

  function handleRemove(id) {
    const newList = relatedProds.filter((item) => item.id !== id);

    setList(newList);
  }

    //console.log("Rltd PRODUCTS "+relatedProds[0].brand);

    if(error){
        return <p style={{color:"red", fontWeight:"bold"}}>Error occured while trying to connect server. Please try again.</p>;
    }


    return(

        <React.Fragment>

        <div style={{border: "3px solid #b5b3b3",marginLeft:'5%',marginRight:'5%',textAlign: 'center' }}>
    {(isProdCompLoaded===true ) && 
    <div>
<h3>Compare Products</h3>
<table id="compTbl" key="compTbl">
            
            <tr>
                <th>
                    Products
                </th>
                <td style={{width:"250px", height:"250px"}}>
                    <img    src={props.currProd.iconUrl} alt="prod" />
                    {props.currProd.title}
                </td>

                {relatedProds.map((relProd,i) =>{

            return(
                  i<4 && <td style={{width:"250px", height:"250px"}} className="hoverClass" key={relatedProds[i].productName} onClick={()=>{props.changeProd(relProd.id)}}>
                            <img className="relImg"   src={relProd.iconUrl} alt="prod" />
                            {relProd.title}
                        </td>
                )}
                )}
            </tr>

            <tr>
                <th>
                    Brand
                </th>
                <td>
                    {props.currProd.brand}
                </td>

                {relatedProds.map((relProd,i) => {
                return (
                    i<4 &&  <td style={{width:"250px"}} > 
                    {relProd.brand}
                </td>
                )}
                )}

            </tr>

            <tr>
                <th>
                    Price
                </th>
                <td>

                {props.currProd.inventryStatus==="AVAILABLE"?
<ProductPrice  price={props.currProd.retailPrice} discount={props.currProd.discount} discountedPrice={props.currProd.discountedPrice} />
: <h4 style={{color:"red"}}>Not in stock!</h4>}
                </td>

                {relatedProds.map((relProd,i)  => {
                    return (
 
                    i<4 && <td style={{width:"250px"}} >

{relProd.inventryStatus==="AVAILABLE"?
                        <ProductPrice hideLabel={true}  price={relProd.retailPrice} discount={relProd.discount} discountedPrice={relProd.discountedPrice} />
                        : <h4 style={{color:"red"}}>Currently not in stock!</h4>}   

                </td>
                )}
                )}

            </tr>


            <tr>
                <th>
                    Warranty
                </th>
                <td>
                    {props.currProd.warrantyDuration}
                </td>


                {relatedProds.map((relProd,i) => {
                    return (
                        i<4 && <td style={{width:"250px"}} >
                    {relProd.warrantyDuration}
                </td>
                )}
                )}

            </tr>
            <tr>
                <th>
                    Returnable
                </th>
                <td>
                    {props.currProd.isReturnable}
                </td>

                {relatedProds.map((relProd,i) => {
                    return (
                        i<4 && <td style={{width:"250px"}} >
                    {relProd.isReturnable}
                </td>
                )}
                )}
            </tr>



            <tr>
                <th>
                    User Rating
                </th>
                <td>
                    {getStar(props.currProd.ratings.averageRatings)}
                </td>

                {relatedProds.map((relProd,i) => {
                    return (
                        i<4 && <td style={{width:"250px"}} >
                    {getStar(relProd.ratings.averageRatings)}
                        <div>
                        <a href={"#popup1"+relProd.id}>User Review</a>
                        </div>

                        <div id={"popup1"+relProd.id} class="overlay">
                        <div class="popup">
                            <h2>User Review</h2>
                            <a class="close" href="#">&times;</a>
                            <div class="content">
                            <UserReviews reviews={relProd.ratings}/>
                            </div>
                        </div>
                    </div>

                </td>
                )}
                )}
            </tr>



        </table>
</div>
                }
        </div>


                
        </React.Fragment>    
    )

}


export default ProductComparison;
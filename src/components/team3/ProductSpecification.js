import React from "react"
import "./css/ProductSpecification.css"

function ProductSpecification(props){

    return (
        <div>
            <h4>Specification</h4>
        <div className="specText">
            {props.spec}
        </div>

        </div>

    )


}

export default ProductSpecification;
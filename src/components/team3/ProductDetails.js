import React from 'react';
import axios from 'axios';
import Product from './Product';
class ProductDetails extends React.Component {
	state = {
		isLoading: true,
		product: {},
		cart: {},
		stateCount: 0	,
		productId:0,
		error:null

	}


	
	async componentDidMount() {

			this.getProductDetails();			
			//this.getRelatedProducts();
			this.getCart();
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error });
	}

    constructor(props){
        super(props)
        this.props=props;
		//const [product, setProduct] = React.useState(null);
		//this.setState({productId: this.props.productId})
		this.state = {
			isLoading: true,
			product: {},
			cart: {},
			stateCount: 0	,
			productId:this.props.productId,
			error:null
	
		}
    }

	async getProductDetails(){
		try{
				//await axios.get(`https://api.npoint.io/2ec37b2b6c56a140fc2b?productId=`+this.props.productId)
				await axios.get(`http://localhost:8080/api/products/getByID/`+this.state.productId)
				.then(response => {
					const productData = response.data;
					//console.log("Product is "+productData.productCategory);
					this.setState({isLoading: true,product : productData });					
				})
			}
			catch(error){
				this.setState({isLoading: true,error});
			}
	}

	async getCart(){
		//await axios.get(`https://api.npoint.io/c922f3a5acb9f87cdeea?userId=`+50)
		await axios.get(`https://dummyjson.com/carts/1`)
		.then(response => {
			const cartData = response.data;
			this.setState({ isLoading: false, cart : cartData});
		})
	}


	handleCount=()=>{ 
		//console.log("STATE COUNT "+this.state.stateCount);
		this.getCart();
		this.setState({stateCount:this.state.stateCount+1}); 
	} 
	
	changeProdId=(newProdId)=>{
		console.log("Old Prod Id "+this.state.productId)
		console.log("New Prod Id "+newProdId)
		this.setState({productId:newProdId, isLoading: true, product:{}} , ()=>{
			this.getProductDetails();
			this.getCart();});
		
	}


	render() {
        
		if (this.state.error) {
			return <p>An error occurred: {this.state.error.message}</p>;
		}

		const prod=this.state.product;
		const cart = this.state.cart;
		console.log("State is "+prod.title);
		console.log("ISLoading is "+this.state.isLoading);

		

		return (
			this.state.isLoading ?"" : <Product product={prod} cart={cart} handleCount={this.handleCount} changeProd={this.changeProdId}/>

)}
}


export default ProductDetails;
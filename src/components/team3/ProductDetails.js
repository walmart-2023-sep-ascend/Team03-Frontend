import React from 'react';
import axios from 'axios';
import Product from './Product';
class ProductDetails extends React.Component {
	state = {
		isLoading1: true,
		isLoading2: true,
		product: {},
		cart: {},
		stateCount: 0	,
		productId:0,
		error:null

	}


	
	async componentDidMount() {

		this.getCart();
		this.getProductDetails(); 
			

/*  			this.setState({isLoading: true, product:{}} , ()=>{
				this.getProductDetails();
				this.getCart();});  */

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
			isLoading1: true,
			isLoading2: true,
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
				
				let productData={}
			
			//	await axios.get(`http://localhost:8080/api/products/getByID/`+this.state.productId)
			await axios.get(`http://proddetails.eastus.cloudapp.azure.com:9200/api/products/getByID/`+this.state.productId)
			.then(response => {
					 productData = response.data.data;
					console.log("Product is "+productData);
										
				})

				this.setState({product : productData }, ()=>{
					this.loadingCompleted();
				});
			}
			catch(error){
				this.setState({isLoading1: true,error});
			}
	}



	async getCart(){
		let cartData ={};
		//await axios.get(`https://api.npoint.io/c922f3a5acb9f87cdeea?userId=`+50)
		await axios.get(`https://dummyjson.com/carts/1`)
		.then(response => {
			cartData = response.data;
			
		})
		this.setState({ isLoading2: false, cart : cartData});
	}

	loadingCompleted(){
		console.log("Completed loading");
		this.setState({isLoading1: false});
	}

	handleCount=()=>{ 
		//console.log("STATE COUNT "+this.state.stateCount);
		this.getCart();
		this.setState({stateCount:this.state.stateCount+1}); 
	} 
	
	changeProdId=(newProdId)=>{
		console.log("Old Prod Id "+this.state.productId)
		console.log("New Prod Id "+newProdId)
		this.setState({productId:newProdId, isLoading1: true,isLoading2:true, product:{}} , ()=>{
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
		console.log("ISLoading is "+this.state.isLoading1);

		

		return (
			(this.state.isLoading2 || this.state.isLoading1) ?"" : <Product product={prod} cart={cart} handleCount={this.handleCount} changeProd={this.changeProdId}/>

)}
}


export default ProductDetails;
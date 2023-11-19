import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import ProductImage from '../ProductImage';
 
class Imgslider extends Component {

  constructor(props){
    super(props);
  }

  
  createImg=()=>{
    
    let imgCount=this.props.images.length;
    console.log("IMG CNT "+imgCount);
    let imgItems = []
    for (let i = 0; i < imgCount; i++) {
      imgItems.push(<ProductImage image={this.props.images[i]} key={i} />)
    }

    console.log({imgItems})
    return imgItems
  }



  render() {
    let imgCount=this.props.images.length;
    const settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: dots => {
        return <MagicSliderDots dots={dots} numDotsToShow={imgCount} dotWidth={30} />;
      }
    }; 
 



    return (
      <Slider {...settings}>

          
         {this.createImg()}
        
      </Slider>
    )
  }
}

export default Imgslider; 
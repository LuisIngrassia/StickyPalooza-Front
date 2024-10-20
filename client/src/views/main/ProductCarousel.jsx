import React from 'react';
import Slider from 'react-slick';

const ProductCarousel = ({ products }) => {
  console.log('Rendering Product Carousel', products);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: products.length > 3 ? 3 : products.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <div key={product.id} className="p-4 border border-white">
          <h4 className="text-lg font-semibold text-purple-300">{product.name}</h4>
          <p className="text-green-300">{product.description}</p>
          <p className="font-bold text-purple-400">${product.price}</p>
        </div>
      ))}
    </Slider>
  );
  
};


export default ProductCarousel;

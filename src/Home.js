import React from 'react';
import './Home.css';
import Product from './Product';
import { Link, useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  // List of products
  const products = [
    { id: '1', title: 'THE ABYSS BEYOND', price: 229.99, image: 'https://images1.penguinrandomhouse.com/cover/9780345547217', rating: 5 },
    { id: '2', title: 'COSMIC CONNECTION', price: 138.99, image: 'https://img.readthistwice.com/unsafe/240x360/books/44b3114a-7100-40d2-8d93-51080653cfae.jpg', rating: 4 },
    { id: '3', title: 'THE MOON BOOK', price: 319.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJXOawGG80VKfFIGg-zMy6tfHaFag3J11H7A&s', rating: 5 },
    { id: '4', title: 'BLACKHOLE PARADIGM', price: 328.99, image: 'https://m.media-amazon.com/images/I/91m5BxTSGZL._AC_UF1000,1000_QL80_.jpg', rating: 5 },
    { id: '5', title: 'PLANETS AND SPACE', price: 218.99, image: 'https://www.ombooksinternational.com/wp-content/uploads/2023/11/9789386316547_1.jpg', rating: 3 },
    { id: '6', title: 'HUMANS AND SPACE', price: 329.99, image: 'https://m.media-amazon.com/images/I/71JEqj220eL._AC_UF1000,1000_QL80_.jpg', rating: 2 },
    { id: '7', title: 'HAWKINGS BLACKHOLE', price: 448.99, image: 'https://m.media-amazon.com/images/I/91elhBJsITL._AC_UF1000,1000_QL80_.jpg', rating: 5 },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  // Split filtered products into rows of three
  const rows = [];
  for (let i = 0; i < filteredProducts.length; i += 3) {
    rows.push(filteredProducts.slice(i, i + 3));
  }

  return (
    <div className='home'>
      <div className='home_container'>
        <img className='home_image' src='https://assets.penguinrandomhouse.com/wp-content/uploads/2015/10/10111843/Space-List-PRH_site_1200x628_Dysfunction.jpg' alt='' />
        
        {filteredProducts.length > 0 ? (
          rows.map((row, index) => (
            <div key={index} className='home_row'>
              {row.map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                />
              ))}
            </div>
          ))
        ) : (
          <Link to='/'>
          <p className='para'>Book is not available.<br/>Go To Home Page.</p> // Message when no products are found
          </Link>        
        )}
      </div>
    </div>
  );
}

export default Home;

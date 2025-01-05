// src/hooks/useFetchData.js
import { useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { slug: 'mens-shirts', category: 'Clothing' },
    { slug: 'womens-dresses', category: 'Clothing' },
    { slug: 'tops', category: 'Clothing' },
    { slug: 'womens-jewellery', category: 'Clothing' },
    { slug: 'mens-shoes', category: 'Shoes' },
    { slug: 'womens-shoes', category: 'Shoes' },
    { slug: 'womens-bags', category: 'Bags' },
    { slug: 'mobile-accessories', category: 'Accessories' },
    { slug: 'sports-accessories', category: 'Accessories' },
    { slug: 'sunglasses', category: 'Accessories' },
    { slug: 'laptops', category: 'Laptops' },
    { slug: 'furniture', category: 'Furniture' }
  ];

  const fetchData = (category) => {
    const categoryItems = categories.filter(cat => cat.category === category); 
    setIsLoading(true);
    setError(null);

    const fetchProducts = async () => {
      try {
        const dataPromises = categoryItems.map((cat) =>
          fetch(`https://dummyjson.com/products/category/${cat.slug}`)
            .then((response) => response.json())
        );

        const allData = await Promise.all(dataPromises); 
        const combinedData = allData.flatMap((data) => data.products);  
        setData(combinedData); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  };

  return { data, isLoading, error, fetchData };
};

export default useFetch;

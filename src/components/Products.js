import { useState, useEffect } from 'react';
import Card from '../Card';
import { db } from '../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Products() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <div className="products">
        {products?.length > 0 ? (
          products?.map((product) => {
            return <Card name={product.name} id={product.id} cost={product.cost} key={product.id} image={product.image[0]}></Card>;
          })
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
}

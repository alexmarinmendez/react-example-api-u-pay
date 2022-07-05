import { useState, useEffect } from 'react';
import Card from '../Card';
import { db } from '../utils/firebaseConfig';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { idCategory } = useParams();

  async function getProducts() {
    let q;
    if (idCategory) {
      q = query(collection(db, 'products'), where('categoryId', '==', parseInt(idCategory)));
    } else {
      q = query(collection(db, 'products'));
    }
    // const querySnapshot = await getDocs(collection(db, 'products'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
  }

  //componentDidMount
  useEffect(() => {
    console.log(idCategory);
    getProducts()
      // .then((data) => console.log(data))
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [idCategory]);

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

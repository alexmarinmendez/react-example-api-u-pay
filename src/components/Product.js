import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const Product = () => {
  const [product, setProduct] = useState({});
  const { idProduct } = useParams();

  async function getProductById(idProduct) {
    const docRef = doc(db, 'products', idProduct);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data());
      return {
        id: idProduct,
        ...docSnap.data(),
      };
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  useEffect(() => {
    // getProducts().then((data) => setProducts(data));
    getProductById(idProduct)
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Detalles del producto</h2>
      {product.name}
    </>
  );
};

import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import { RiHeart3Line } from 'react-icons/ri';

import PriceCard from '../../components/priceCard/priceCard';
import ProductCorasal from '../../components/ProductCorasal/ProductCorasal';

import './ProductScreen.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getProductFail,
  getProductPending,
  getProductSuccess,
} from '../../features/getProductDetailsSlice';
import { getProductById } from '../../api/productApi';

export const ProductScreen = ({ className, ...restProps }) => {
  const ProductScreenClasses = CN(
    'product-screen container max-w-screen-xl px-1 lg:px-3 h-full',
    className,
    {}
  );

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [productInformation, setProductInformation] = useState([]);
  const [price, setPrice] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [images, setImages] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);

  const { id } = useParams();

  useEffect(async () => {
    if (id) {
      dispatch(getProductPending());
      try {
        const products = await getProductById(id);
        setProductData(products);
        dispatch(getProductSuccess());
      } catch (error) {
        // setProgressed(100);
        dispatch(getProductFail(error.message));
      }
    }
  }, [id]);

  useEffect(() => {
    if (productData !== undefined) {
      const {
        productInformation,
        productAttributes,
        images,
        inventory,
        price,
        shipping,
      } = productData;
      setProductInformation(productInformation);
      setProductAttributes(productAttributes);
      setImages(images);
      setInventory(inventory);
      setPrice(price);
      setShipping(shipping);
    }
  }, [productData]);

  return (
    <div className={ProductScreenClasses} {...restProps}>
      <div className="w-3/5 product-screen__corasal">
        <div className="h-auto m-2 product-screen__corasal__content ">
          <ProductCorasal images={images} />
        </div>
        <div className="flex flex-col items-center justify-center m-2 h-1/5 product-screen__corasal__details">
          {/* <div className="fixed left-16 right-16">
            <RiHeart3Line size={32} color="red" />
          </div> */}
          <div className="w-4/6 h-12 product-screen__details__shipping bg-G-light">
            <div className="font-semibold product-screen__details__shipping__title">
              {shipping?.shippingDescription
                ? shipping?.shippingDescription
                : `FREE SHIPPING`}
            </div>
            <div className="text-sm italic product-screen__details__shipping__description">
              {shipping?.ship
                ? shipping?.shippingNote
                : `Free shipping on all orders over $50`}
            </div>
          </div>
          <div className="mt-3 text-sm italic product-screen__details__shipping__copy-right text-G-dark">
            your one-ship shop for growing - Jofe of every sale domained to the
            best test test ds ©
          </div>
        </div>
      </div>
      <div className="w-2/5 ml-24 product-screen__details-cart">
        <div className="product-screen__details-cart__price-card">
          <PriceCard
            productName={productInformation?.name}
            productPrice={price?.wholeSalePrice}
            productQuantity={productInformation?.availableQuantity}
            productColors={productAttributes?.colors}
            productSizes={productAttributes?.sizes}
          />
        </div>
        <div className="pt-4 text-sm text-justify product-screen__details-cart__price-details text-G-dark">
          <div className="font-semibold product-screen__details-cart__price-details__title">
            {productInformation?.shortDescription}
          </div>
          <div className="product-screen__details-cart__price-details__details">
            {productInformation?.fullDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductScreen.defaultProps = {
  className: undefined,
};

export default ProductScreen;

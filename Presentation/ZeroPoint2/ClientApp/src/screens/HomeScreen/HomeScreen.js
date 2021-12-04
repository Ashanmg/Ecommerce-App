import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import CN from 'classnames';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { css } from '@emotion/react';

import ProductCard from '../../components/ProductCard/ProductCard';
import {
  hiddenProds,
  initialMProducts,
  initialFProducts,
} from '../../config/product';
import useMediaQuery from '../../config/customHooks/useMediaQuery';
import Loading from '../../components/Loading/Loading';

import './HomeScreen.scss';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 100%;
  align-items: center;
`;

export const HomeScreen = ({ className, ...restProps }) => {
  const HomeScreenClasses = CN(
    'home-screen container max-w-screen-xl px-1 lg:px-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-3 md:gap-x-6 md:gap-y-2 h-auto',
    className,
    {}
  );

  const [largeWide, setLargeWide] = useState(false);
  const [mediumWide, setMediumWide] = useState(false);
  const [smallWide, setSmallWide] = useState(false);

  const isLargeWide = useMediaQuery('(min-width: 1024px)');
  const isMediumWide = useMediaQuery('(min-width: 768px)');
  const isSmallWide = useMediaQuery('(min-width: 640px)');

  useEffect(() => {
    setLargeWide(isLargeWide);
    setMediumWide(isMediumWide);
    setSmallWide(isSmallWide);
  }, [isLargeWide, isMediumWide, smallWide]);

  const [products, setProducts] = useState(initialFProducts);
  const [productLoadLength, setProductLoadLength] = useState(
    Array.from({ length: 24 })
  );
  const [hasMore, setHasMore] = useState(true);
  const [randomLimit, setRandomLimit] = useState(5);

  const fetchMoreData = () => {
    if (productLoadLength.length === products.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setProductLoadLength(
        productLoadLength.concat(Array.from({ length: 12 }))
      );
    }, 1500);
  };

  let productCopy = [...products];
  let randomFirst, randomSecond, randomThird;

  // useEffect(() => {
  //   if (isLargeWide && isMediumWide && isSmallWide) {
  //     setProducts(initialFProducts);
  //     setRandomLimit(6);
  //   } else if (!isLargeWide && isMediumWide && isSmallWide) {
  //     setProducts(initialMProducts);
  //     setRandomLimit(4);
  //   } else if (!isLargeWide && !isMediumWide && !isSmallWide) {
  //     setProducts(initialMProducts);
  //     setRandomLimit(4);
  //   }
  // }, [isLargeWide, isMediumWide, isSmallWide]);

  // useEffect(() => {
  //   const pro = setInterval(() => {
  //     let first = Math.floor(Math.random() * randomLimit);
  //     let second = Math.floor(Math.random() * randomLimit + randomLimit);
  //     let third = Math.floor(Math.random() * randomLimit + randomLimit * 2);

  //     randomFirst = Math.floor(Math.random() * hiddenProds.length);
  //     let randomFElement = hiddenProds[randomFirst];
  //     hiddenProds.splice(randomFirst, 1);

  //     randomSecond = Math.floor(Math.random() * hiddenProds.length);
  //     let randomSElement = hiddenProds[randomSecond];
  //     hiddenProds.splice(randomSecond, 1);

  //     randomThird = Math.floor(Math.random() * hiddenProds.length);
  //     let randomTElement = hiddenProds[randomThird];
  //     hiddenProds.splice(randomThird, 1);

  //     hiddenProds.push(productCopy[first]);
  //     hiddenProds.push(productCopy[second]);
  //     hiddenProds.push(productCopy[third]);

  //     productCopy[first] = randomFElement;
  //     productCopy[second] = randomSElement;
  //     productCopy[third] = randomTElement;

  //     setProducts(productCopy);
  //   }, 3000);

  //   return () => {
  //     clearInterval(pro);
  //   };
  // }, [products]);

  return (
    <InfiniteScroll
      className={HomeScreenClasses}
      dataLength={productLoadLength.length}
      hasMore={hasMore}
      next={fetchMoreData}
      loader={
        <BeatLoader
          css={override}
          // size={15}
          color={'#005C27'}
          on
          loading={true}
          speedMultiplier={1}
        />
      }
      {...restProps}
    >
      <Helmet>
        <title>ZeroPoint2 - Sustainable, Socially Responsible Gifts</title>
        <meta
          name="description"
          content="ZeroPoint2, Sustainable, socially responsible gifts - Your one-stop shop for giving - 20% of every sale donated to the charity of your choice."
        />
      </Helmet>
      {/* {products.map((product, idx) => (
        <ProductCard
          onClick={() => console.log(idx)}
          key={product.id || _.uniqueId}
          thumbnail={product.thumbnail}
          price={product.price}
        />
      ))} */}
      {productLoadLength.map((i, idx) => (
        <ProductCard
          onClick={() => console.log(idx)}
          key={products[idx].id || _.uniqueId}
          thumbnail={products[idx].thumbnail}
          price={products[idx].price}
        />
      ))}
    </InfiniteScroll>
  );
};

HomeScreen.defaultProps = {
  className: undefined,
};

export default HomeScreen;

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import CN from 'classnames';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router';

import ProductCard from '../../components/ProductCard/ProductCard';
import { initialFProducts } from '../../config/product';
import useMediaQuery from '../../config/customHooks/useMediaQuery';
import Loading from '../../components/Loading/Loading';

import './HomeScreen.scss';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 100%;
  align-items: center;
`;

export const HomeScreen = ({ className, isAuthenticated, ...restProps }) => {
  const HomeScreenClasses = CN(
    'home-screen container max-w-screen-xl px-1 lg:px-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-3 md:gap-x-6 md:gap-y-2 h-auto mb-10',
    className,
    {}
  );

  const navigate = useNavigate();

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
  const [moveProduct, setMoveProduct] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
    <InfiniteScroll
      className={HomeScreenClasses}
      dataLength={productLoadLength.length}
      hasMore={hasMore}
      next={fetchMoreData}
      loader={
        <BeatLoader
          css={override}
          // size={15}"
          color={'#005C27'}
          on
          loading={true}
          speedMultiplier={1}
        />
      }
      {...restProps}
    >
      <Helmet>
        <title>Zeropoint2 – Gifts That Save The World</title>
        <meta
          name="description"
          content="Zeropoint2 – sustainable, socially responsible, handmade gifts – your one stop shop for giving – 20% of every purchase donated to the charity of your choice."
        />
      </Helmet>
      {productLoadLength.map((i, idx) => (
        <ProductCard
          onClick={(e) => {
            if (!isAuthenticated) {
              setMoveProduct(false);
              setSelectedProduct(products[idx]);
              setTimeout(() => {
                setMoveProduct(true);
              }, 5000);
            } else {
              navigate(`/product/${products[idx].id}`);
            }
          }}
          key={products[idx].id || _.uniqueId}
          thumbnail={products[idx].thumbnail}
          shortDescription={products[idx].shortDescription}
          price={products[idx].price}
          isAuthenticated={isAuthenticated}
          moveProduct={
            _.isEqual(selectedProduct, products[idx]) ? moveProduct : true
          }
        />
      ))}
    </InfiniteScroll>
  );
};

HomeScreen.defaultProps = {
  className: undefined,
};

export default HomeScreen;

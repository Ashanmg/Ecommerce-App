import React from 'react';
import CN from 'classnames';
import { RiInformationLine } from 'react-icons/ri';

import { DropDown } from '../../components/DropDown/DropDown';

import './priceCard.scss';
import Button from '../Button/Button';
import SizePicker from '../SizePicker/SizePicker';
import ColorChipsPicker from '../ColorChipsPicker/ColorChipsPicker';
import { TextField } from '../TextField';

export const priceCard = ({
  className,
  productName,
  productPrice,
  productQuantity,
  ...restProps
}) => {
  const priceCardClasses = CN(
    'price-card flex justify-center flex-col',
    className,
    {}
  );

  const sizeList = [
    {
      id: 1,
      size: 'S',
      tooltip: 'S',
    },
    {
      id: 2,
      size: 'M',
      tooltip: 'M',
    },
    {
      id: 3,
      size: 'L',
      tooltip: 'L',
    },
    {
      id: 4,
      size: 'XL',
      tooltip: 'xL',
    },
    {
      id: 5,
      size: '2XL',
      tooltip: '2xL',
    },
  ];

  const colorChips = [
    { id: 1, name: 'Blue', hex: ['#00598D'], tooltip: 'Blue' },
    { id: 2, name: 'Yellow', hex: ['#F28200'], tooltip: 'Yellow' },
    { id: 3, name: 'Red', hex: ['#E63F3F'], tooltip: 'Red' },
    {
      id: 4,
      name: 'Green',
      hex: ['#39A26A', '#5B68D9', '#E63F3F'],
      tooltip: 'Green',
    },
    { id: 5, name: 'Purple', hex: ['#5B68D9'], tooltip: 'Purple' },
  ];

  return (
    <div className={priceCardClasses} {...restProps}>
      <div className="flex justify-center w-full p-2 font-semibold price-card__title bg-G-light">
        <span> {productName} </span>
        <RiInformationLine className="cursor-pointer" size={24} />
      </div>
      <div className="flex justify-between pt-4 font-semibold price-card__unit-price">
        <div className="text-lg price-card__unit-price-lable text-G-dark">
          Unit Price
        </div>
        <div className="text-3xl price-card__unit-price-value text-G-dark">
          {`$${productPrice}`}
        </div>
      </div>
      <div className="flex justify-between pt-4 gap-x-2 price-card__inputs">
        <div className="flex items-center price-card__inputs__qty">
          {productQuantity ? (
            <>
              <span className="pr-2">Qty</span>
              <TextField
                type={'number'}
                min="1"
                max={productQuantity}
                className="flex-1 mr-2"
                value={productQuantity}
              />
            </>
          ) : (
            <span className='font-bold text-R-500' > Not Available </span>
          )}

          {/* <DropDown options={[1, 2, 3, 4, 5]} /> */}
        </div>
        <Button
          children="Add to Cart"
          className="flex items-center px-3 py-1 text-xs text-white border-2 h-7 md:h-8 lg:h-10 md:py-2 xl:px-8 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
          // onClick={handleToggle}
        />
        <Button
          children="View Cart"
          className="flex items-center px-3 py-1 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 md:py-2 xl:px-8 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
          // onClick={handleToggle}
        />
      </div>
      <div className="pt-4 product-screen__details-cart__product-details">
        <SizePicker
          sizeList={sizeList}
          defaultActive={1}
          onChange={(e) => console.log(e)}
        />
      </div>
      <div className="pt-4 product-screen__details-cart__product-details">
        <ColorChipsPicker
          colorChips={colorChips}
          defaultActive={1}
          onChange={(e) => console.log(e)}
        />
      </div>
    </div>
  );
};

priceCard.defaultProps = {
  className: undefined,
};

export default priceCard;

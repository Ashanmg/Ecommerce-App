import React, { useState, useEffect } from 'react';
import CN from 'classnames';

import './ImagesForm.scss';
import DropZone from '../../../components/DropZone/DropZone';

export const ImagesForm = ({ className, setFieldValue, images=[], ...restProps }) => {
  const ImagesFormClasses = CN(
    'images-form px-3 py-7 border-t border-N-100 gap-3',
    className,
    {}
  );

  const [image1, setImage1] = useState([]);
  const [imageUrl1, setImageUrl1] = useState(images[0] ? images[0].imageUrl : []);
  const [image2, setImage2] = useState([]);
  const [imageUrl2, setImageUrl2] = useState(images[1] ? images[1].imageUrl : []);
  const [image3, setImage3] = useState([]);
  const [imageUrl3, setImageUrl3] = useState(images[2] ? images[1].imageUrl : []);
  const [image4, setImage4] = useState([]);
  const [imageUrl4, setImageUrl4] = useState(images[3] ? images[1].imageUrl : []);
  const [image5, setImage5] = useState([]);
  const [imageUrl5, setImageUrl5] = useState(images[4] ? images[1].imageUrl : []);
  const [image6, setImage6] = useState([]);
  const [imageUrl6, setImageUrl6] = useState(images[5] ? images[1].imageUrl : []);
  const [image7, setImage7] = useState([]);
  const [imageUrl7, setImageUrl7] = useState(images[6] ? images[1].imageUrl : []);
  const [image8, setImage8] = useState([]);
  const [imageUrl8, setImageUrl8] = useState(images[7] ? images[1].imageUrl : []);

  useEffect(() => {
    setFieldValue('productImages', [
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
    ]);
  }, [image1, image2, image3, image4, image5, image6, image7, image8]);

  return (
    <div className={ImagesFormClasses} {...restProps}>
      <DropZone
        className="w-32 h-32 bg-white"
        width={80}
        style={{ height: '124px' }}
        img={imageUrl1}
        onChange={(e) => {
          setImage1(e.target.files[0]);
          setImageUrl1(URL.createObjectURL(e.target.files[0]));
        }}
        fileDrop={(e) => {
          e.preventDefault();
          setImage1(e.dataTransfer.files[0]);
          setImageUrl1(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClickCloseImg={(e) => {
          e.preventDefault();
          setImage1(null);
          setImageUrl1('');
        }}
      />
      <DropZone
        className="w-32 h-32 bg-white"
        width={80}
        style={{ height: '124px' }}
        img={imageUrl2}
        onChange={(e) => {
          setImage2(e.target.files[0]);
          setImageUrl2(URL.createObjectURL(e.target.files[0]));
        }}
        fileDrop={(e) => {
          e.preventDefault();
          setImage2(e.dataTransfer.files[0]);
          setImageUrl2(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClickCloseImg={(e) => {
          e.preventDefault();
          setImage2(null);
          setImageUrl2('');
        }}
      />
      <DropZone
        className="w-32 h-32 bg-white"
        width={80}
        style={{ height: '124px' }}
        img={imageUrl3}
        onChange={(e) => {
          setImage3(e.target.files[0]);
          setImageUrl3(URL.createObjectURL(e.target.files[0]));
        }}
        fileDrop={(e) => {
          e.preventDefault();
          setImage3(e.dataTransfer.files[0]);
          setImageUrl3(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClickCloseImg={(e) => {
          e.preventDefault();
          setImage3(null);
          setImageUrl3('');
        }}
      />
      <DropZone
        className="w-32 h-32 bg-white"
        width={80}
        style={{ height: '124px' }}
        img={imageUrl4}
        onChange={(e) => {
          setImage4(e.target.files[0]);
          setImageUrl4(URL.createObjectURL(e.target.files[0]));
        }}
        fileDrop={(e) => {
          e.preventDefault();
          setImage4(e.dataTransfer.files[0]);
          setImageUrl4(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClickCloseImg={(e) => {
          e.preventDefault();
          setImage4(null);
          setImageUrl4('');
        }}
      />
      <DropZone
        className="w-32 h-32 bg-white"
        width={80}
        style={{ height: '124px' }}
        img={imageUrl5}
        onChange={(e) => {
          setImage5(e.target.files[0]);
          setImageUrl5(URL.createObjectURL(e.target.files[0]));
        }}
        fileDrop={(e) => {
          e.preventDefault();
          setImage5(e.dataTransfer.files[0]);
          setImageUrl5(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClickCloseImg={(e) => {
          e.preventDefault();
          setImage5(null);
          setImageUrl5('');
        }}
      />
      <DropZone
        className="w-32 h-32 bg-white"
        width={80}
        style={{ height: '124px' }}
        img={imageUrl6}
        onChange={(e) => {
          setImage6(e.target.files[0]);
          setImageUrl6(URL.createObjectURL(e.target.files[0]));
        }}
        fileDrop={(e) => {
          e.preventDefault();
          setImage6(e.dataTransfer.files[0]);
          setImageUrl6(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClickCloseImg={(e) => {
          e.preventDefault();
          setImage6(null);
          setImageUrl6('');
        }}
      />
      <DropZone
        className="w-32 h-32 bg-white"
        width={80}
        style={{ height: '124px' }}
        img={imageUrl7}
        onChange={(e) => {
          setImage7(e.target.files[0]);
          setImageUrl7(URL.createObjectURL(e.target.files[0]));
        }}
        fileDrop={(e) => {
          e.preventDefault();
          setImage7(e.dataTransfer.files[0]);
          setImageUrl7(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClickCloseImg={(e) => {
          e.preventDefault();
          setImage7(null);
          setImageUrl7('');
        }}
      />
      <DropZone
        className="w-32 h-32 bg-white"
        width={80}
        style={{ height: '124px' }}
        img={imageUrl8}
        onChange={(e) => {
          setImage8(e.target.files[0]);
          setImageUrl8(URL.createObjectURL(e.target.files[0]));
        }}
        fileDrop={(e) => {
          e.preventDefault();
          setImage7(e.dataTransfer.files[0]);
          setImageUrl7(URL.createObjectURL(e.dataTransfer.files[0]));
        }}
        onClickCloseImg={(e) => {
          e.preventDefault();
          setImage8(null);
          setImageUrl8('');
        }}
      />
    </div>
  );
};

ImagesForm.defaultProps = {
  className: undefined,
};

export default ImagesForm;

import React, { useState } from 'react';
import CN from 'classnames';

import './ImagesForm.scss';
import DropZone from '../../../components/DropZone/DropZone';

export const ImagesForm = ({ className, ...restProps }) => {
  const ImagesFormClasses = CN(
    'images-form px-3 py-7 border-t border-N-100  gap-3',
    className,
    {}
  );

  const [image, setImages] = useState(null);
  return (
    <div className={ImagesFormClasses} {...restProps}>
      <DropZone img={image} setImg={setImages} />
      <DropZone img={image} setImg={setImages} />
      <DropZone img={image} setImg={setImages} />
      <DropZone img={image} setImg={setImages} />
      <DropZone img={image} setImg={setImages} />
      <DropZone img={image} setImg={setImages} />
      <DropZone img={image} setImg={setImages} />
      <DropZone img={image} setImg={setImages} />
    </div>
  );
};

ImagesForm.defaultProps = {
  className: undefined,
};

export default ImagesForm;

import React, { useState } from 'react';
import CN from 'classnames';
import { RiUploadCloud2Fill } from 'react-icons/ri';

import './DropZone.scss';
import Button from '../Button/Button';

export const DropZone = ({ className, ...restProps }) => {
  const DropZoneClasses = CN(
    'drop-zone flex flex-col items-center justify-center border-2 border-G-dark p-2 text-xs text-G-dark w-full',
    className,
    {}
  );

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    setImage(files);
    setPreviewUrl(URL.createObjectURL(files));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    setImage(files);
    setPreviewUrl(URL.createObjectURL(files));
  };

  return (
    <div
      className={DropZoneClasses}
      {...restProps}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <div className="icon">
        <RiUploadCloud2Fill size={50} className="text-G-dark" />
      </div>
      <header>Drag & Drop to Upload File</header>
      <span>OR</span>
      <label className="underline cursor-pointer">
        <input type="file" onChange={(e) => handleUpload(e)} hidden />
        Browse File
      </label>
      {previewUrl && <img className="w-32 h-32" src={previewUrl} alt="" />}
    </div>
  );
};

DropZone.defaultProps = {
  className: undefined,
};

export default DropZone;

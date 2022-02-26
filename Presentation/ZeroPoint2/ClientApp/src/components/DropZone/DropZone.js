import React from 'react';
import CN from 'classnames';
import { RiCloseFill, RiUploadCloud2Fill } from 'react-icons/ri';

import './DropZone.scss';

export const DropZone = ({
  className,
  img = [],
  setImages,
  style,
  width,
  onChange,
  fileDrop,
  onClickCloseImg,
  ...restProps
}) => {
  const DropZoneClasses = CN(
    'drop-zone flex flex-col items-center justify-center border-2 border-G-dark p-2 text-xs text-G-dark w-full',
    className,
    {}
  );

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={DropZoneClasses}
      {...restProps}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
      style={style}
    >
      {img?.length === 0 ? (
        <>
          <div className="icon">
            <RiUploadCloud2Fill size={50} className="text-G-dark" />
          </div>
          <header className="text-center">Drag & Drop to Upload File</header>
          <span>OR</span>
          <label className="underline cursor-pointer" name="image-drop">
            <input type="file" name="image" onChange={onChange} hidden />
            Browse File
          </label>
        </>
      ) : (
        <>
          <div>
            <RiCloseFill
              size={20}
              className="cursor-pointer text-G-dark"
              onClick={onClickCloseImg}
            />
          </div>
          <img
            className="w-32 h-32 close-icon"
            style={{ width: width }}
            src={img}
            alt=""
          />
        </>
      )}
    </div>
  );
};

DropZone.defaultProps = {
  className: undefined,
};

export default DropZone;

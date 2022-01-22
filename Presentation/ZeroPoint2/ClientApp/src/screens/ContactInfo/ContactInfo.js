import React, { useEffect } from 'react';
import CN from 'classnames';
import Founder from '../../assets/Founder-remove-bg.png';

import './ContactInfo.scss';

export const ContactInfo = ({ className, ...restProps }) => {
  const ContactInfoClasses = CN(
    'contact-info max-w-screen-xl flex flex-col text-G-dark',
    className,
    {}
  );

  return (
    <div className={ContactInfoClasses} {...restProps}>
      <div className="w-full px-2 leading-9 text-justify top md:px-5">
        <img
          src={Founder}
          alt=""
          className="w-40 h-56 max-w-xs mb-2 mr-5 md:max-w-sm md:h-full"
        />
        <h4 className="text-xl font-base">Richard Croome</h4>
        <h6 className="mb-5">
          richard.croome@zeropoint2.com
        </h6>
        <h6>
          <strong>
            ZeroPoint2 sells handmade goods and donates 20% of all sales to
            worthwhile causes.
          </strong>
        </h6>
        <h6>I do this because it's time for humans to...</h6>
        <ul className="mb-5 ml-5">
          <li>• end our destructive behavior, </li>
          <li>• stop being greedy as a species, and </li>
          <li>• start repairing the planet now, before we become extinct.</li>
        </ul>
        <h6>
          <strong>I work with sustainability influencers.</strong>
        </h6>
        <h6>Usually, our target is to...</h6>
        <ul className="mb-5 ml-5">
          <li>• build a well in a poor community, or</li>
          <li>
            • fund 20 rangers in an African park to protect the wildlife, or
          </li>
          <li>
            • buy X number of acres of rain forest to protect endangered
            species, etc.{' '}
          </li>
        </ul>
        <h6>
          <strong>Every time you buy something here you're...</strong>
        </h6>
        <ul className="mb-5 ml-5">
          <li>• supporting a sustainable artisan business. </li>
          <li>• helping a community or ecosystem that needs your help, and </li>
          <li>
            • assisting the zeropoint2 team, who all grew up and live in low
            income countries.{' '}
          </li>
        </ul>
        <h6>
          <strong>
            Zeropoint2 never charges more than the recommended retail price.
          </strong>
        </h6>
        <ul className="mb-5 ml-5">
          <li>
            • this means you'll never pay more than you should for anything sold
            on this site, and{' '}
          </li>
          <li>• you can be sure your 20% donation is real.</li>
        </ul>
        <h6>
          <strong>Please get involved.</strong>
        </h6>
        <ul className="mb-5 ml-5">
          <li>• Buy one or more gifts for yourself or your loved ones,</li>
          <li>
            • Register for the monthly newsletter so you keep up to date with
            everything we're doing,
          </li>
          <li>
            • contact me if you make amazing handmade stuff and would like more
            sales, or you just want to ask me a question, and
          </li>
          <li>• tell your friends about this site.</li>
        </ul>
        <h6 className="mb-5">
          <strong>Thank you.</strong>
        </h6>
      </div>
    </div>
  );
};

ContactInfo.defaultProps = {
  className: undefined,
};

export default ContactInfo;

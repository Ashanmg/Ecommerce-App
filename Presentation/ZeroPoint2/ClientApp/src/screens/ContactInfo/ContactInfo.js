import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import Founder from '../../assets/Founder-remove-bg.png';

import './ContactInfo.scss';

export const ContactInfo = ({ className, ...restProps }) => {
  const [isAuth, setIsAuth] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    auth ? setIsAuth(true) : setIsAuth(false);
  }, []);
  
  const ContactInfoClasses = CN(
    'contact-info max-w-screen-xl flex flex-col text-G-dark mt-contact',
    className,
    {
      'mt-contact-admin': isAuth && userData.user.userRoleId === 1,
    }
  );

  return (
    <div className={ContactInfoClasses} {...restProps}>
      <div className="text-justify w-full px-2 mt-8 leading-9 top md:px-5">
        <img
          src={Founder}
          alt=""
          className="w-32 h-auto max-w-xs mb-2 mr-5 md:max-w-sm md:h-full"
          style={{
            float: 'left'
          }}
        />
        <h6 className="mb-5">
          I started Zeropoint2 because it combines my love of retail with my
          desire to save the planet.
        </h6>
        <h6 className="mb-5">
          When I was 17, I started my first market business at Flemington in
          Sydney selling my own hand-painted designs.
        </h6>
        <h6 className="mb-5">Then I went to uni.</h6>
        <h6 className="mb-5">
          In 1995 I started another hand-painted business, this time focusing on
          dinosaur designs for children. I was in Cairns, and we operated out of
          three shopping centers and several markets, including Kuranda.
        </h6>
        <h6 className="mb-5">Then I became a teacher.</h6>
        <h6 className="mb-5">
          Throughout my life though, my love for art and quality handmade
          products has always stayed with me. And over the years my desire to
          give back and do something to stop the destruction of the planet
          (probably something to do with studying and teaching geography), has
          just grown and grown.
        </h6>
        <h6 className="mb-5">
          So, Zeropoint2 is my way of feeding my desire to surround myself with
          beautiful handmade art and help communities and ecosystems in need.
        </h6>
        <h6 className="mb-5">
          I make a point of not inflating the retail prices of any of the
          artisans I promote on Zeropoint2 because otherwise the 20% donation
          wouldn't be real. The focus of the business is firmly on helping, not
          profit.
        </h6>
        <h6 className="mb-5">
          Usually, I work with influencers who choose the charity they would
          like to donate to. Together we ask our followers to consider
          purchasing something they need, and in doing so, support one or more
          of the artisans on this site, as well as the charity.
        </h6>
        <h6 className="mb-5">
          Zeropoint2 is a totally online business, so I also make the point of
          employing people from low income countries. That way, almost every
          cent that passes through the business helps an underserved community
          somewhere in the world.
        </h6>
        <h6 className="mb-5">
          My dream is to make Zeropoint2 the biggest private donor company,
          supporting the greatest number of home-based artisans, employing the
          greatest number of staff from low income countries, whilst selling the
          most beautiful handmade products in the world.
        </h6>
        <h6 className="mb-5">
          I encourage you to join me in making this a reality.
        </h6>
        <h6 className="mb-5">Thank you,</h6>
        <h6>
          <strong>Richard Croome</strong>
        </h6>
        <h6 className="mb-5">richard.croome@zeropoint2.com</h6>
      </div>
    </div>
  );
};

ContactInfo.defaultProps = {
  className: undefined,
};

export default ContactInfo;

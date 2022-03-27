import React, { useEffect, useState } from 'react';
import CN from 'classnames';

import './ContactInfo.scss';

export const ContactInfo = ({ className, ...restProps }) => {
  const [isAuth, setIsAuth] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
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
        {/* <img
          src={Founder}
          alt=""
          className="w-32 h-auto max-w-xs mb-2 mr-5 md:max-w-sm md:h-full"
          style={{
            float: 'left'
          }}
        /> */}
        <h6 className="mb-5">
          Zeropoint2 is a company focussed on helping people and animals.
        </h6>
        <h6 className="mb-5">We do this in a number of ways.</h6>
        <h6 className="mb-5">
          Firstly we donate 20% of every sale to charity. The charities we
          donate to vary during the course of the year and every charity is
          chosen by a sustainability influencer. Once a sustainability
          influencer agrees to work with us, we create a two-week program to
          promote their charity (and the artists at Zeropoint2), to their
          followers. At the end of the two-week period, we donate 20% of all the
          sales to the influencer's nominated charity.
        </h6>
        <h6 className="mb-5">
          Usually, we fundraise to build a well in a community, pay rangers in a
          wildlife reserve or help purchase X number of acres of rain forest
          somewhere in the world to protect endangered species.
        </h6>
        <h6 className="mb-5">We repeat this process about 20 times a year.</h6>
        <h6 className="mb-5">
          The second way we help people is by supporting artisan makers. At
          least 50% of any purchase on Zeropoint2 is paid to an artisanal
          business somewhere in the world. Quite often the makers live in
          developing countries and the money makes a big difference to the
          quality of their lives and the communities they live in.
        </h6>
        <h6 className="mb-5">
          The third way we help people is by employing professionals from low
          income countries. This provides professionals in developing nations
          with opportunites they might not have previously had, and also allows
          them to make a living without having to move away from their families
          and friends.
        </h6>
        <h6 className="mb-5">
          Lastly, we never inflate the prices of the products we sell on
          Zeropoint2. Everything we sell is exactly the same price as listed on
          the artisan's website. That way you can be sure the donation is real
          and that together we're making a positive contribution to the future
          of the planet.
        </h6>
      </div>
    </div>
  );
};

ContactInfo.defaultProps = {
  className: undefined,
};

export default ContactInfo;

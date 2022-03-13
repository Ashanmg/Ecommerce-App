import React, { useEffect, useState } from 'react';
import CN from 'classnames';

import './Support.scss';

export const Support = ({ className, ...restProps }) => {
  const [isAuth, setIsAuth] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
    auth ? setIsAuth(true) : setIsAuth(false);
  }, []);

  const SupportClasses = CN(
    'contact-info max-w-screen-xl flex flex-col text-G-dark mt-contact',
    className,
    {
      'mt-contact-admin': isAuth && userData.user.userRoleId === 1,
    }
  );

  return (
    <div className={SupportClasses} {...restProps}>
      <div className="text-justify w-full px-2 mt-8 leading-9 top md:px-5">
        <h6 className="mb-5 text-center"><strong>FAQ</strong></h6>
        <h6>
          <strong>
            Will you use images from my website and post them on the Zeropoint2
            website?
          </strong>
        </h6>
        <h6 className="mb-5">
          Yes, we need images to promote your products and using images already
          available on your website is the easiest way to do that.
          Alternatively, you can provide me with different images. I will not
          add any products or product images to Zeropoint2 catalog unless I have
          your explicit permission.
        </h6>
        <h6>
          <strong>
            Will your prices be the same as the prices on my website?
          </strong>
        </h6>
        <h6 className="mb-5">
          Yes, the prices on Zeropoint2 will match the retail prices you sell
          your work for. That way the donation of 20% for each sale is real.
        </h6>
        <h6>
          <strong>Where is your main customer base?</strong>
        </h6>
        <h6 className="mb-5">
          Zeropoint2 works with sustainability influencers around the globe.
          They can be any influencer who is passionate about a cause and wants
          to raise money for their cause. Once an Influencer agrees to work with
          Zeropoint2, we work together to create a two-week social media
          promotion (usually on Instagram or Your Tube), to highlight the
          charity's cause and the artisans promoted on Zeropoint2. The
          influencer's follower base then becomes Zeropoint2's customer base for
          that two-week period. At the end of the campaign Zeropoint2 donates
          20% of each sale to the charity the influencer nominated.
        </h6>
        <h6>
          <strong>If my products sell - how does the money get split?</strong>
        </h6>
        <h6 className="mb-5">
          At the end of each two-week campaign, Zeropoint2 will place an order
          with you for all of your work that has been sold. You will be paid in
          full including your postage costs. 20% goes to the charity nominated
          by the influencer and the remainder is used to run the Zeropoint2
          website.
        </h6>
        <h6>
          <strong>Do I fulfill the order directly or you?</strong>
        </h6>
        <h6 className="mb-5">
          There are several fulfillment options. You can choose to fulfill the
          order directly to the end customer. This is the cheapest way to get
          the product to the customer. Alternatively, you can send the order to
          a third party logistics firm located either in the US (for orders
          where the Americas are the final destination), or in Germany for
          orders where Europe is the final destination. If you decide to become
          a Zeropoint2 supplier, you will be given the details of the third
          party logistics providers.
        </h6>
        <h6>
          <strong>
            Each item is unique so therefore can only be sold once.
          </strong>
        </h6>
        <h6 className="mb-5">
          Zeropoint2 can only promote products that can be considered short runs
          or a series acknowledging that each piece is unique and that
          variations will occur. Zeropoint2 does not sell artisan products that
          are unique and cannot be closely replicated.
        </h6>
        <h6>
          <strong>
            I’m currently in Europe so I won’t begin new production for another
            few months when the leaves are back on the trees!
          </strong>
        </h6>
        <h6 className="mb-5">
          That is no problem at all. Just let us know when the products are
          available and we will make your part of the Zeropoint2 website visible
          to the public.
        </h6>
      </div>
    </div>
  );
};

Support.defaultProps = {
  className: undefined,
};

export default Support;

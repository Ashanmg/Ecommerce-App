import React from 'react';
import CN from 'classnames';
import Founder from '../../assets/founder.jpg';

import './ContactInfo.scss';

export const ContactInfo = ({ className, ...restProps }) => {
  const ContactInfoClasses = CN(
    'contact-info max-w-screen-xl flex flex-col',
    className,
    {}
  );

  return (
    <div className={ContactInfoClasses} {...restProps}>
      <div className="top flex flex-col md:flex-row px-2 md:px-4 lg:px-1 w-full leading-9 mt-8">
        <img
          src={Founder}
          alt=""
          className="w-40 h-56 mr-8 shadow"
          style={{ borderRadius: '50%' }}
        />
        <div className="top-para text-justify">
          <h6>
            Hi, I 've been an artist, artisan, marketeer and boutique retailer
            (with a bit of teaching thrown in along the way), since 1982.
          </h6>
          <br />
          <h6>
            My artisan career began when I opened my first market stall at
            Flemington market in Sydney selling my hand painted t-shirt designs.
            I was still at school at the time, however I spent most afternoons
            during the week painting and designing and then went to market on
            the weekends.
          </h6>
          <br />
          <h6>
            I wasn't madly successful, but it did pay the rent and kept me going
            until the next weekend, and what's more, I really loved it.
            Unfortunately, when I was offered a place at a university in another
            state, my fledgling business had to take a step backwards.
          </h6>
        </div>
      </div>
      <br />
      <div className="bottom-para text-justify leading-9 px-2 md:px-4 lg:px-1">
        <h6>
          It wasn't until 1995 that the art / artisan / retail bug hit again.
          This time I was in Cairns, Australia and again I was selling my own
          handpainted designs, however this time, they were bespoke children's
          designs painted on the spot for customers in markets and shopping
          malls.
        </h6>
        <br />
        <h6>
          The business was very successful. Over the course of nearly three
          years my wife and I operated in four markets and three shopping
          centres in Cairns and had 15 staff. That was until the 1997 Asian
          financial crisis hit. At the time, Cairns was very popular with Asian
          tourists, and almost overnight in July 1997, at the peak of the
          tourist season, they disappeared.
        </h6>
        <br />
        <h6>
          The financial impact on the business was catastrophic. We held out
          thinking things would improve, I traded casual leases in shopping
          malls up and down the east coast of Australia for well over a year but
          Cairns still hadn't recovered, so we ended up closing the business.
        </h6>
        <br />
        <h6>
          At that point, I went back to university, studied a Masters and a PhD
          and then spent 20 years alternating between being a professor and a
          school teacher, almost always teaching as an expat where markets (as I
          know them), don't exist. I'm still an expat, and I still love it, but
          it's time to get back into artistry and retailing again.
        </h6>
        <br />
        <h6>
          Whilst travelling the world teaching, it has become evident that the
          growth of Big Shopping i.e., shopping malls, has effectively killed
          retail diversity. All the malls the world over generally have the same
          brands in them selling the same stuff.
        </h6>
        <br />
        <h6>
          It's so boring. Strip shopping has been badly affected and artisan
          markets and boutique stores have generally retreated to country towns
          and villages where it's only possible to venture into the cities for
          the annual Christmas fairs and other significant religious and / or
          cultural celebrations.
        </h6>
        <br />
        <h6>
          Admittedly, Covid has hurt face-to-face shopping over the past two
          years. But bricks-and-mortar retailing is not dead, far from it. In
          fact over 80% of retail is still conducted face-to-face, and now, more
          than ever, there is an opportunity to breath diversity back into
          face-to-face retailing and to make shopping a fun treasure hunt again.
        </h6>
        <br />
        <h6>
          This has always been my passion, and this is why I have created
          ArtizansHub. I want to see a future where little known artisans earn a
          good living from their talents, a future where boutique retailers are
          constantly able to refresh their product offering with outstanding
          quality handmade products, and a future where we all enjoy going out
          shopping and having fun again.
        </h6>
        <br />
        <h6>
          If you are a talented artisan and / or a boutique retailer who prides
          themselves in making and selling quality handmade products, then I
          warmly extend an invitation to you to join the ArtizansHub community.
        </h6>
        <br />
        <h6>
          <strong>Richard Croome</strong>
          <br />
          Founder, ArtizansHub
        </h6>
      </div>
    </div>
  );
};

ContactInfo.defaultProps = {
  className: undefined,
};

export default ContactInfo;

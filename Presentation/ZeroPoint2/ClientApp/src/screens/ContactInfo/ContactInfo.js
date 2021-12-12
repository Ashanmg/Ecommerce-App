import React, { useEffect } from 'react';
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
      <div className="text-justify w-full px-2 mt-8 leading-9 top md:px-5">
        <img
          src={Founder}
          alt=""
          className="w-40 h-56 mr-5 shadow"
          style={{ borderRadius: '50%', width: '100%', float: 'left', maxWidth: '160px' }}
        />
        <h6 className="mb-5">Hi,</h6>
        <h6 className="mb-5">I'm Richard Croome, and I'm the founder of ZeroPoint2.</h6>
        <h6 className="mb-5">ZeroPoint2 donates 20% of all its sales to worthwhile causes.</h6>
        <h6 className="mb-5">
          Each month between February and December I fund-raise for a variety of different causes that have an immediate and lasting positive impact on the planet.
        </h6>
        <h6 className="mb-5">
          I do this because I believe it's time for us to end our destructive human ways. There's more than enough for everybody on this planet and we have to stop being greedy as a species or we'll become extinct.
        </h6>
        <h6 className="mb-5">
          Every time you buy something on this website you're supporting a small sustainable artisan business somewhere in the world. You're also supporting the people who help me run this website, all of whom live in low income countries, and you're helping to provide clean water, sanitation, food security and / or teacher training to a needy community, or saving a threatened ecosystem and it's species from extinction.
        </h6>
        <h6 className="mb-5">
          I only promote brands that protect the environment, conserve water, energy and land, produce products that are safe to use and are ethically responsible.
        </h6>
        <h6 className="mb-5">
          I always try to support projects that work towards solving the root cause of a problem rather than addressing the symptoms.
        </h6>
        <h6 className="mb-5">
          Please get involved. The brands I promote on this site are top quality handmade limited runs and they deserve your support. Equally, the people and the ecosystems that your donation will benefit, will profoundly effect them (and you), in a positive way.
        </h6>
        <h6 className="mb-5">
          I never charge more than the artisan's recommended retail price. I keep my costs as low as possible by operating solely online and with everyone working remotely from home. Because of this, you can be sure that you'll never pay more than you should for the amazing products you see on this site, and that the 20% donated from every sale is a genuine donation possible because I keep the costs really low and am happy with a tiny profit.
        </h6>
        <h6 className="mb-5">
          I'm always eager to hear from artisans who would like to join me, so please contact me if you make amazing stuff and would like more sales.
        </h6>
        <h6 className="mb-5">
          If you register for the monthly newsletter you will be able to keep up to date with developments from projects I have previously funded, product reviews, interviews with people doing incredible sustainability things around the world, information about new artisans I have discovered, and of course, the latest cause I'm funding.
        </h6>
        <h6 className="mb-5">
          Thank you for your support. If you have any questions at all, please contact me via the link below and I will respond to you personally.
        </h6>
        <h6><strong>Richard Croome</strong></h6>
        <h6>CEO@ZeroPoint2.com</h6>
      </div>
    </div>
  );
};

ContactInfo.defaultProps = {
  className: undefined,
};

export default ContactInfo;

import React from 'react';
import CN from 'classnames';

export const FundRaiseScreen = ({
  className,
  handleSignUpModal,
  onClose,
  ...restProps
}) => {
  const FundRaiseScreenClasses = CN(
    'sign-up-screen w-full h-4/6 flex justify-center items-center',
    className,
    {}
  );

  return (
    <div
      className={FundRaiseScreenClasses}
      {...restProps}
      style={{ backgroundColor: '#01a45300' }}
    >
      <div className="flex items-center justify-center w-full h-full p-5 sign-up-screen__wrapper">
        <div className="flex flex-col justify-center flex-1 h-full p-10 bg-white border-4 sign-up-screen__left border-G-light">
          <div className="mb-8 text-2xl font-semibold text-center sign-up-screen__left__title text-G-dark">
            Fundraising Information
          </div>
          <div className="text-xs sign-up-screen__left__form">
            <h6>
              We are always fundraising for a good cause and we always donate
              20% of every sale to charity.
            </h6>
            <br />
            <h6>
              We work with sustainability influencers who nominate a charity
              they would like to donate to.
            </h6>
            <br />
            <h6>
              Together we create a two week campaign to promote the artists on
              this website and the charity the influencer has nominated.
            </h6>
            <br />
            <h6>
              At the end of the two weeks, we donate 20% of the sales to the
              charity.
            </h6>
            <br />
            <h6>
              Currently zeropoint2 is in Beta mode and we will be launching
              soon. If you would like to know more bout the influencers and the
              charities we have lined up for the future, please{' '}
              <strong
                className="underline cursor-pointer text-G-dark"
                onClick={() => {
                  handleSignUpModal();
                  onClose();
                }}
                onKeyPress={() => {
                  handleSignUpModal();
                  onClose();
                }}
                role={'button'}
                tabIndex={0}
              >
                sign-up
              </strong>{' '} to our
              monthly newsletter.
            </h6>
            <br />
            <h6>Thank you,</h6>
            <h6>
              <strong>Richard Croome</strong>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

FundRaiseScreen.defaultProps = {
  className: undefined,
};

export default FundRaiseScreen;

import React from 'react';
import CN from 'classnames';

export const FundRaiseScreen = ({ className, ...restProps }) => {
    const FundRaiseScreenClasses = CN(
        'sign-up-screen w-full h-4/6 flex justify-center items-center',
        className,
        {}
      );

    
    return (
        <div className={FundRaiseScreenClasses}
            {...restProps}
            style={{ backgroundColor: '#01a45300' }}>
            <div className="flex items-center justify-center w-full h-full p-5 sign-up-screen__wrapper">
                <div className="flex flex-col justify-center flex-1 h-full p-10 bg-white border-4 sign-up-screen__left border-G-light">
                    <div className="mb-8 text-2xl font-semibold text-center sign-up-screen__left__title text-G-dark">
                        FundRaising Information
                    </div>
                    <div className="text-xs sign-up-screen__left__form">
                        <h6>
                            We are always fundraising for a good cause and we always donate 20% of every sale to charity.
                        </h6>
                        <br />
                        <h6>
                            Every two weeks, from February to December, we focus on fundraising for different projects that have an immediate positive effect on people and the environment.
                        </h6>
                        <br />
                        <h6>
                            We also fund raise for The Water Project throughout the year.
                        </h6>
                        <br />
                        <h6>
                            The Water Project is a world class charity that oversees community clean water projects in sub Saharan Africa so that women and children no longer have to walk up to 10km a day to fetch dirty water that makes them sick.
                        </h6>
                        <br />
                        <h6>
                            Having clean water gives the children the health they need to attend school, whilst their mothers have the time and resources to grow the food needed to live well.
                        </h6>
                        <br />
                        <h6>
                            You can choose to donate your gift to either The Water Project or to our focus project no matter when you make your purchase during the year. The choice is yours.
                        </h6>
                        <br />
                        <h6>
                            To find out who will benefit from our next focus project, please register and join our newsletter group.
                        </h6>
                        <br />
                        <h6>
                            Many thanks,
                        </h6>
                        <h6>
                            <strong>Richard</strong>
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
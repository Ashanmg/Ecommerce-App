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
            <div className="top flex flex-col md:flex-row px-2 md:px-4 lg:px-12 w-full leading-9 mt-8">
                <img
                    src={Founder}
                    alt=""
                    className="w-40 h-56 mr-8 shadow"
                    style={{ borderRadius: '50%' }}
                />
                <div className="top-para text-justify">
                    <h6>
                        We are currently waiting for the IRS to issue us with our EIN number so we can get started.
                    </h6>
                    <br />
                    <h6>
                        The backlog (because of Covid19), to incorporate a foreign owned business in the US is approximately 4 months at the moment. So, we wait.
                    </h6>
                    <br />
                    <h6>
                        As soon as we get our EIN, we will begin trading guided by the following vision and mission.
                    </h6>
                </div>
            </div>
            <br />
            <div className="bottom-para text-justify leading-9 px-2 md:px-4 lg:px-12">
                <h6>
                    ZeroPoint2 will donate 20% of all its sales to worthwhile causes.
                </h6>
                <br />
                <h6>
                    We will donate to causes that provide water, sanitation, food and education security to vulnerable communities around the world as well as to causes that protect habitat and wildlife.
                </h6>
                <br />
                <h6>
                    Each month we will focus on a different cause and try to donate enough money to fully fund a project that has an immediate and lasting positive impact on the planet.
                </h6>
                <br />
                <h6>
                    We will do this because it is time to end our destructive ways. There is more than enough for everybody on this planet. We have to stop being greedy as a species or we will become extinct.
                </h6>
                <br />
                <h6>
                    To do our bit, ZeroPoint2 will promote the work of artisans who make sustainable handmade products and we will use the proceeds from the sale of their goods to help others.
                </h6>
                <br />
                <h6>
                    Every time you buy something on this site you will be supporting a small sustainable artisanal business somewhere in the world and you will also be helping to provide clean water, sanitation, food security and / or teacher training to a needy community, or help a threatened ecosystem and it's species survive extinction.
                </h6>
                <br />
                <h6>
                    We will only promote brands that protect the environment, conserve water, energy and land, produce products that are safe to use whilst they are being made and used, and are ethically responsible.
                </h6>
                <br />
                <h6>
                    We will always try to support projects that work towards solving the root cause of a problem rather than addressing the symptoms.
                </h6>
                <br />
                <h6>
                    Please get involved. The brands that will be promoted on this site will be top quality handmade limited runs and they deserve your support. Equally, the people and the ecosystems that your donation will benefit will profoundly effect them (and you), in a positive way.
                </h6>
                <br />
                <h6>
                    We are always eager to hear from artisans who would like to join us, so please contact us if you make amazing stuff and would like more sales.
                </h6>
                <br />
                <h6>
                    If you register for the monthly newsletter you will be able to keep up to date with the projects we fund, product reviews, interviews with people doing incredible things around the world, information about new artisans we have found, and of course, the latest cause we are funding.
                </h6>
                <br />
                <h6>
                    Thank you for reading. If you have any questions at all, please contact me via the link below.
                </h6>
                <br />
                <h6>
                    <strong>Richard Croome</strong>
                    <br />
                    CEO@ZeroPoint2.com
                </h6>
                <br />
            </div>
        </div>
    );
};

ContactInfo.defaultProps = {
    className: undefined,
};

export default ContactInfo;

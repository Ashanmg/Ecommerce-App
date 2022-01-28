import React, { useState } from 'react';
import CN from 'classnames';

import AccordionItem from './AccordionItem';

import './Accordion.scss';

export const Accordion = ({ className, list, ...restProps }) => {
  const AccordionClasses = CN('accordion flex flex-col w-full', className, {});

  const [expanded, setExpanded] = useState(0);

  return (
    <div className={AccordionClasses} {...restProps}>
      {(list || []).map((item, idx) => (
        <AccordionItem
          key={item?.id || idx}
          item={item}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </div>
  );
};

Accordion.defaultProps = {
  list: undefined,
  className: undefined,
};

export default Accordion;

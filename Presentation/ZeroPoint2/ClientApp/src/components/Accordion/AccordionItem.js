import React from 'react';
import CN from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import './Accordion.scss';
import { RiArrowDownSLine } from 'react-icons/ri';

export const AccordionItem = ({
  className,
  item,
  expanded,
  setExpanded,
  ...restProps
}) => {
  const { id, content, title } = item || {};
  const isOpen = id === expanded;

  return (
    <div className="accordion__item">
      <motion.header
        className="accordion__button flex w-full items-center justify-between cursor-pointer"
        initial={false}
        onClick={() => setExpanded(isOpen ? false : item?.id)}
      >
        <span className="body-font-style-1-500">{title}</span>
        {content && (
          <RiArrowDownSLine
            size={24}
            className="accordion__button__icon text-G-light hover:text-G-100"
            style={isOpen ? { transform: 'rotate(180deg)' } : {}}
          />
        )}
      </motion.header>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className="accordion__content"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.15, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="accordion__content__inner body-font-style-2-400">
              {content}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;

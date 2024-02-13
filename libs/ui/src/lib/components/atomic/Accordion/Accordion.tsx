import { Accordion as ReshapedAccordion } from 'reshaped';
import type { AccordionProps } from 'reshaped';

const Accordion = (props: AccordionProps) => {
  const { attributes, children, className, defaultActive, onToggle } = props;

  return (
    <ReshapedAccordion
      attributes={attributes}
      className={className}
      defaultActive={defaultActive}
      onToggle={onToggle}
    >
      {children}
    </ReshapedAccordion>
  );
};

Accordion.Trigger = ReshapedAccordion.Trigger;
Accordion.Content = ReshapedAccordion.Content;
export default Accordion;

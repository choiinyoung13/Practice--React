import { useAccordionContext } from './Accordion'

export default function AccordionContent({ id, className, children }) {
  const { selectedItemId } = useAccordionContext()

  const isOpen = selectedItemId === id

  return (
    <div
      className={
        isOpen ? `${className ?? ''} open` : `${className ?? ''} close`
      }
    >
      {children}
    </div>
  )
}

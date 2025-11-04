import { useAccordionContext } from './Accordion'
import { useAccordionItemContext } from './AccordionItem'

export default function AccordionContent({ className, children }) {
  const id = useAccordionItemContext()
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

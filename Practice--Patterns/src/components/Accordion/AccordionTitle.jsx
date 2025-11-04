import { useAccordionContext } from './Accordion'
import { useAccordionItemContext } from './AccordionItem'

export default function AccordionTitle({ className, children }) {
  const id = useAccordionItemContext()
  const { selectedItemId, openItem, closeItem } = useAccordionContext()

  const isOpen = selectedItemId === id

  function handleClick() {
    if (isOpen) {
      closeItem()
    } else {
      openItem(id)
    }
  }

  return (
    <h3 className={className} onClick={handleClick}>
      {children}
    </h3>
  )
}

import { createContext, useContext, useState } from 'react'
import AccordionItem from './AccordionItem'
import AccordionTitle from './AccordionTitle'
import AccordionContent from './AccordionContent'

const AccordionContext = createContext()

/* 
 createContext()에 기본값을 제공하지 않아서 Provider 밖에서 useContext를 호출하면
 undefined를 반환하고, 이를 if (!ctx) 조건문에서 감지하여 에러를 던짐
*/

export function useAccordionContext() {
  const ctx = useContext(AccordionContext)

  if (!ctx) {
    throw new Error(
      'Accordion-realated components must be wrapped by <Accordion>'
    )
  }

  return ctx
}

export default function Accordion({ children, className }) {
  const [selectedItemId, setSelectedItemId] = useState(null)

  function openItem(id) {
    setSelectedItemId(id)
  }
  function closeItem() {
    setSelectedItemId(null)
  }

  const contextValue = {
    selectedItemId,
    openItem,
    closeItem,
  }

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  )
}

Accordion.Item = AccordionItem
Accordion.Title = AccordionTitle
Accordion.Content = AccordionContent

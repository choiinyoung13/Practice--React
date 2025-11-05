import { Children, useState } from 'react'

/**
 * SearchableList 컴포넌트 - Render Props 패턴 사용
 *
 * Render Props 패턴:
 * - children을 함수로 받아서, 각 item을 어떻게 렌더링할지 부모 컴포넌트가 결정
 * - 검색 로직은 이 컴포넌트가 담당하고, 렌더링 방식은 부모가 제어
 * - 재사용성과 유연성이 높아짐
 */
export default function SearchableList({ items, children, itemKeyFn }) {
  const [searchTerm, setSearchTerm] = useState('')

  function handleInputChange(event) {
    setSearchTerm(event.target.value)
  }

  // 검색어에 따라 items 필터링
  const filteredItems = items.filter(item => {
    return JSON.stringify(item)
      .toLowerCase()
      .includes(searchTerm.toString().toLowerCase()) // includes함수는 ''일 때 항상 true를 반환함
  })

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleInputChange} />
      <ul>
        {filteredItems.map(item => (
          // 핵심: children을 함수로 호출하여 각 item을 렌더링
          // 부모 컴포넌트에서 전달한 함수가 실행됨
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  )
}

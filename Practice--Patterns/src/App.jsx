import Accordion from './components/Accordion/Accordion'
import SearchableList from './components/SearchableList/SearchableList'
import savannaImg from './assets/african-savanna.jpg'
import amazonImg from './assets/amazon-river.jpg'
import caribbeanImg from './assets/caribbean-beach.jpg'
import desertImg from './assets/desert-dunes.jpg'
import forestImg from './assets/forest-waterfall.jpg'
import Place from './Place'

const PLACES = [
  {
    id: 'african-savanna',
    image: savannaImg,
    title: 'African Savanna',
    description: 'Experience the beauty of nature.',
  },
  {
    id: 'amazon-river',
    image: amazonImg,
    title: 'Amazon River',
    description: 'Get to know the largest river in the world.',
  },
  {
    id: 'caribbean-beach',
    image: caribbeanImg,
    title: 'Caribbean Beach',
    description: 'Enjoy the sun and the beach.',
  },
  {
    id: 'desert-dunes',
    image: desertImg,
    title: 'Desert Dunes',
    description: 'Discover the desert life.',
  },
  {
    id: 'forest-waterfall',
    image: forestImg,
    title: 'Forest Waterfall',
    description: 'Listen to the sound of the water.',
  },
]

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <Accordion.Item id="a1" className="accordion-item">
            <Accordion.Title className={'accordion-item-title'}>
              We got 20 years of experience
            </Accordion.Title>

            <Accordion.Content className="accordion-item-content">
              <article>
                <p>You can&apos;t go wrong with us.</p>
                <p>
                  We are in the business of planing highly individualized
                  vacation trips for more than 20 years.
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="a2" className="accordion-item">
            <Accordion.Title className={'accordion-item-title'}>
              We're working with local guides
            </Accordion.Title>

            <Accordion.Content className="accordion-item-content">
              <article>
                <p>We are not doing this along from our office.</p>
                <p>
                  Instead, we are working with local guides to ensure a safe and
                  pleasant vacation.
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>

      <section>
        {/* 
          Render Props 패턴 사용 예시 #1
          - SearchableList에게 PLACES 배열을 전달
          - children으로 함수를 전달: item을 받아서 <Place> 컴포넌트로 렌더링
          - SearchableList는 검색/필터링만 담당하고, 렌더링 방식은 이 함수가 결정
        */}
        <SearchableList items={PLACES} itemKeyFn={item => item.id}>
          {item => <Place item={item} />}
        </SearchableList>

        {/* 
          Render Props 패턴 사용 예시 #2
          - 같은 SearchableList 컴포넌트를 재사용
          - 이번엔 문자열 배열을 전달하고, item을 그대로 텍스트로 렌더링
          - 동일한 컴포넌트로 완전히 다른 UI를 표현 가능 (유연성!)
        */}
        <SearchableList items={['item 1', 'item 2']} itemKeyFn={item => item}>
          {item => item}
        </SearchableList>
      </section>
    </main>
  )
}

export default App

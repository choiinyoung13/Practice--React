'use client'

// import RSCDemo from './RSCDemo'

export default function ClientDemo({ children }) {
  console.log('ClientDemo rendered')
  return (
    <div className="client-cmp">
      <h2>A React Client Component</h2>
      <p>
        Will be rendered on the client <strong>AND</strong> the server.
      </p>
      {children}
      {/* <RSCDemo />  클라이언트 컴포넌트안에 서버 컴포넌트를 그냥 넣으면 클라이언트 컴포넌트로 변함 */}
    </div>
  )
}

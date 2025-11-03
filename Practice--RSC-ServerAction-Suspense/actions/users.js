'use server'

import fs from 'node:fs'

/*
    Server Actions = 서버에서 실행되는 함수를 클라이언트에서 직접 호출할 수 있게 해주는 기능
    'use server'를 붙이면 그 함수는 서버에서만 실행됨 API 라우트 없이 바로 서버 코드 실행 가능
    폼(form)의 action 속성에 직접 연결 가능
*/

/* 폼 제출할 땐 FormData가 자동으로 만들어져서 넘어온다! */
export async function saveUserAction(formData) {
  console.log('Executed')
  const data = fs.readFileSync('dummy-db.json', 'utf-8')
  const instructors = JSON.parse(data)
  const newInstructor = {
    id: new Date().getTime().toString(),
    name: formData.get('name'),
    title: formData.get('title'),
  }

  instructors.push(newInstructor)
  fs.writeFileSync('dummy-db.json', JSON.stringify(instructors))
}

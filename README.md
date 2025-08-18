# DevCra Next.js Template

프론트 개발용 템플릿

- Next.js v15.2.1
- React v19.0.0
- Tailwind CSS v4.0
- Auth.js(Next-auth) v5.0.0-beta.25

## Getting Started

```bash
$ yarn
$ cp .env.sample .env.local
$ sed -i '' "s|^AUTH_SECRET=.*|AUTH_SECRET=$(openssl rand -base64 33)|" .env.local
// .env.local에 AUTH_SECRET 추가
$ yarn dev
```

프론트 기본 사항

- 기본 폰트는 PretendardStd 를 사용합니다. (https://cactus.tistory.com/306)

인증 기본 사항

- 기본 인증용 계정

  - test@test.com / helloworld

- Auth 인증용 API Route
  - /api/signin (/src/app/api/signin/route.ts)

## Contact

템플릿은 누구든지 개선 하셔도 됩니다.

**P/R 환영**

#b_client_dev 로 오셔서 의견주셔도 됩니다.

###

Next 템플릿

- [github 레포](https://github.com/DevCra/devcra-nextjs-template)
- [feat/ui 브랜치](https://github.com/DevCra/devcra-nextjs-template/tree/feat/ui)
  - 라이브러리 공식문서와 같은 ui 페이지 구성 및 컴포넌트
    - breadcrumb, button, gnb, input, modal, pagination, select, table
  - headless ui 방식의 Button 컴포넌트 제작

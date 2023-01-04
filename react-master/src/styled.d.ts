// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}


/*
#3.6 Themes - Styled-components with TypeScript

DefaultTheme는 기본적으로 props.theme의 인터페이스로 사용된다.
기본적으로 DefaultTheme 인터페이스는 비어 있으므로 확장시켜야 한다.

1. styled.d.ts 를 만든다. (참고: d.ts 는 declaration file 이라는 뜻)
2. theme.ts (테마) 를 만든다.
3. index.tsx 에 2에서 만든 테마를 주입한다.
4. app.tsx 에서 props 로 받아 사용한다.

https://styled-components.com/docs/api#typescript
*/
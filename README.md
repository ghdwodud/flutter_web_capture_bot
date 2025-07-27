# Flutter Web Capture Bot

Flutter 웹 애플리케이션의 스크린샷을 자동으로 캡처하는 Node.js 도구입니다.

## 🚀 기능

- Flutter 웹 앱의 여러 페이지를 자동으로 캡처
- 모바일 뷰포트 (390x844)로 최적화된 스크린샷
- 설정 가능한 캡처 지연 시간
- Puppeteer 기반의 안정적인 캡처

## 📋 요구사항

- Node.js 16.0.0 이상
- Flutter 웹 앱이 실행 중이어야 함
- Chrome 브라우저

## 🛠️ 설치

```bash
# 의존성 설치
npm install
```

## 📖 사용법

### 1. Flutter 웹 앱 실행

먼저 Flutter 웹 앱을 포트 3000에서 실행합니다:

```bash
cd ../gd-app-client
flutter run -d chrome --web-port=3000
```

### 2. 캡처 봇 실행

새 터미널에서 캡처 봇을 실행합니다:

```bash
cd flutter-web-capture-bot
npm start
```

### 3. 캡처 결과 확인

캡처된 이미지들은 `captures/` 폴더에 저장됩니다:

- `login.png` - 로그인 페이지
- `home.png` - 홈 페이지  
- `store.png` - 매장 페이지
- `mypage.png` - 마이페이지
- `store_map.png` - 매장 지도 페이지
- `kit_browsing.png` - 키트 브라우징 페이지

## ⚙️ 설정

### routes.json

캡처할 페이지들을 `routes.json`에서 설정할 수 있습니다:

```json
[
  {
    "path": "/login",
    "filename": "login.png",
    "description": "로그인 페이지"
  },
  {
    "path": "/main", 
    "filename": "home.png",
    "description": "홈 페이지"
  }
]
```

### 캡처 설정

`src/capture.js`에서 다음 설정을 변경할 수 있습니다:

- `viewport`: 브라우저 뷰포트 크기 (기본: 390x844)
- `waitUntil`: 페이지 로딩 대기 조건 (기본: "networkidle2")
- `timeout`: 페이지 로딩 타임아웃 (기본: 30000ms)
- `delay`: 캡처 전 대기 시간 (기본: 3000ms)

## 📝 스크립트

```bash
# 캡처 실행
npm start
npm run capture

# 테스트 실행
npm test

# 캡처 파일 정리
npm run clean

# 도움말 보기
npm run help
```

## 🔧 문제 해결

### 연결 오류
- Flutter 앱이 포트 3000에서 실행 중인지 확인
- `http://localhost:3000`에 브라우저로 접근 가능한지 확인

### 캡처 실패
- 페이지 로딩 시간이 충분한지 확인
- `routes.json`의 경로가 올바른지 확인
- Flutter 앱의 라우팅이 제대로 설정되어 있는지 확인

### 빈 화면 캡처
- Flutter 앱이 완전히 로딩될 때까지 대기 시간 증가
- 네트워크 상태 확인

## 📁 프로젝트 구조

```
flutter-web-capture-bot/
├── src/
│   ├── capture.js      # 메인 캡처 로직
│   └── test.js         # 테스트 스크립트
├── captures/           # 캡처된 이미지 저장 폴더
├── routes.json         # 캡처할 페이지 설정
├── package.json        # 프로젝트 설정
└── README.md          # 이 파일
```

## 🤝 기여

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [Puppeteer](https://pptr.dev/) - 브라우저 자동화
- [Flutter](https://flutter.dev/) - 웹 애플리케이션 프레임워크 
# Flutter Web Capture Bot

Flutter Web 앱의 모든 페이지를 자동으로 캡처하는 도구입니다.

## 🚀 기능

- **자동 페이지 캡처**: routes.json에 정의된 모든 페이지를 자동으로 스크린샷
- **CLI 인터페이스**: 명령행에서 다양한 옵션으로 캡처 실행
- **유연한 설정**: URL, 포트, 뷰포트, 대기 시간 등 모든 설정 커스터마이징 가능
- **프로젝트 초기화**: 새로운 프로젝트를 위한 초기 설정 자동 생성

## 📦 설치

```bash
npm install
```

## 🎯 사용법

### 1. 기본 사용법

```bash
# 기본 설정으로 캡처 실행
npm start

# 또는 CLI 사용
npm run capture
```

### 2. CLI 옵션 사용

```bash
# 특정 URL과 포트로 캡처
npm run capture -- --url http://localhost:3000 --port 3000

# 커스텀 뷰포트와 대기 시간
npm run capture -- --width 1920 --height 1080 --delay 5000

# 헤드리스 모드 비활성화 (브라우저 창 표시)
npm run capture -- --no-headless

# 커스텀 라우트 파일과 출력 디렉토리
npm run capture -- --routes custom-routes.json --output screenshots
```

### 3. 새 프로젝트 초기화

```bash
# 기본 설정으로 초기화
npm run init

# 커스텀 URL로 초기화
npm run init -- --url http://localhost:5000
```

## ⚙️ 설정

### routes.json

캡처할 페이지들을 정의합니다:

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

### capture-config.json (선택사항)

기본 설정을 커스터마이징할 수 있습니다:

```json
{
  "url": "http://localhost:8080",
  "port": 8080,
  "viewport": {
    "width": 390,
    "height": 844
  },
  "delay": 3000,
  "headless": true,
  "outputDir": "captures"
}
```

## 🔧 CLI 옵션

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `-u, --url` | Flutter 앱 URL | `http://localhost:8080` |
| `-p, --port` | 포트 번호 | `8080` |
| `-r, --routes` | 라우트 설정 파일 | `routes.json` |
| `-o, --output` | 출력 디렉토리 | `captures` |
| `-w, --width` | 뷰포트 너비 | `390` |
| `-h, --height` | 뷰포트 높이 | `844` |
| `-d, --delay` | 페이지 로딩 대기 시간 (ms) | `3000` |
| `--headless` | 헤드리스 모드 활성화 | `true` |
| `--no-headless` | 헤드리스 모드 비활성화 | - |

## 📁 프로젝트 구조

```
flutter-web-capture-bot/
├── src/
│   ├── capture.js      # 핵심 캡처 로직
│   └── cli.js          # CLI 인터페이스
├── routes.json         # 캡처할 페이지 정의
├── capture-config.json # 기본 설정 (선택사항)
├── captures/           # 캡처된 이미지 저장
└── package.json
```

## 🎯 사용 예시

### 다른 Flutter 앱에서 사용

```bash
# 다른 프로젝트에서 사용
cd my-flutter-app
npm run init -- --url http://localhost:5000
# routes.json 편집
npm run capture
```

### 다양한 설정으로 테스트

```bash
# 데스크톱 뷰포트로 캡처
npm run capture -- --width 1920 --height 1080

# 긴 대기 시간으로 안정성 확보
npm run capture -- --delay 10000

# 특정 라우트만 캡처
# custom-routes.json 생성 후
npm run capture -- --routes custom-routes.json
```

## 🔍 문제 해결

### 포트 충돌
```bash
# 다른 포트 사용
npm run capture -- --port 3000
```

### 페이지 로딩 실패
```bash
# 대기 시간 증가
npm run capture -- --delay 10000
```

### 브라우저 디버깅
```bash
# 헤드리스 모드 비활성화
npm run capture -- --no-headless
```

## 📝 라이센스

MIT License 
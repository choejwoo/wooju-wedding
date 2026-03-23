# 우주 모바일 청첩장 페이지 개발

## 프로젝트 개요

모바일 최적화된 청첩장 웹페이지를 개발합니다. 모바일 퍼스트로 설계하되, 데스크톱에서도 깔끔하게 보이는 반응형 디자인을 적용합니다.

**두 가지 버전**을 제공합니다:
- `/seniors` — 어른용 (부모님 지인, 친척 등). 격식 있는 톤, 초대 문구 중심
- `/friends` — 친구용. 캐주얼한 톤, 갤러리/공유 중심

같은 HTML 템플릿(`index.html`)을 공유하고, 각 버전별 데이터 파일(`data-seniors.js`, `data-friends.js`)만 달리하여 콘텐츠를 분기합니다. 루트(`/`)에 접속하면 두 버전 중 하나로 리다이렉트하거나 선택 페이지를 보여줍니다.

## 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 커스텀 속성(변수), Flexbox/Grid, 미디어쿼리
- **JavaScript**: Vanilla JS (ES6+), 빌드 도구 없이 순수 구현
- **애니메이션**: CSS 애니메이션 + Intersection Observer API (스크롤 트리거)
- **배포**: GitHub Pages + 가비아 커스텀 도메인
- **외부 라이브러리**: 없음 (의존성 zero, 순수 HTML/CSS/JS)

## 디자인 방향

- 모바일 퍼스트 반응형 (max-width: 480px 기준, 데스크톱은 중앙 카드 레이아웃)
- 톤앤매너: 깔끔하고 모던한 웨딩 감성 (화이트/베이지/골드 계열)
- 세로 스크롤 원페이지 구성
- 부드러운 fade-in / slide-up 스크롤 애니메이션
- 구글 폰트: Noto Serif KR (제목), Pretendard (본문)

## 페이지 섹션 구성 (위에서 아래 순서)

### 1. 메인 커버
- 대표 사진 (풀 화면 or 상단 영역)
- 신랑 & 신부 이름
- 예식 일시
- 아래로 스크롤 유도 화살표 애니메이션

### 2. 초대 문구
- 감성적인 초대 인사말 텍스트
- 양가 부모님 이름
- 예식 일시 & 장소 요약

### 3. 사진 갤러리
- 그리드 또는 캐러셀 형태의 사진 갤러리
- 사진 터치/클릭 시 라이트박스(확대) 기능
- 최소 6~12장 사진 표시

### 4. 예식 장소 & 지도
- 예식장 이름 & 주소
- 카카오맵 또는 네이버 지도 임베드
- 지도 앱 바로가기 버튼 (카카오맵, 네이버지도, 티맵)
- 주차 안내 등 간단한 교통 정보

### 5. 마음 전하실 곳 (축의금 송금)
- 신랑측 / 신부측 탭 또는 아코디언
- 계좌번호 복사 버튼 (클립보드 복사 + 토스트 알림)
- 은행명, 예금주, 계좌번호 표시
- 카카오페이 송금 링크 (선택)

### 6. 버스 대절 & 참석 여부
- Google Form 또는 외부 폼 링크 임베드/연결
- "참석 여부 알려주기" CTA 버튼
- 버스 대절 안내 텍스트 + 신청 링크 버튼
- 출발 장소, 시간 등 간단한 안내 정보

### 7. 푸터
- 카카오톡 공유하기 버튼
- 링크 복사 버튼
- 저작권 텍스트 (간단하게)

## 데이터 관리

공통 데이터는 `js/data-common.js`, 버전별 차이는 `js/data-seniors.js`와 `js/data-friends.js`에서 관리합니다.
각 폴더의 `index.html`이 해당 데이터 파일을 로드하여 같은 템플릿에 다른 콘텐츠를 렌더링합니다.

```javascript
// js/data-common.js — 두 버전이 공유하는 데이터
const weddingCommon = {
  groom: { name: "", father: "", mother: "" },
  bride: { name: "", father: "", mother: "" },
  date: "2026-00-00T00:00:00",
  location: {
    name: "",
    address: "",
    hall: "",
    mapCoord: { lat: 0, lng: 0 },
  },
  accounts: {
    groom: [{ bank: "", holder: "", number: "" }],
    bride: [{ bank: "", holder: "", number: "" }],
  },
  share: {
    kakaoKey: "",
  },
};
```

```javascript
// js/data-seniors.js — 어른용 오버라이드
const weddingVariant = {
  greeting: "두 사람이 사랑과 믿음으로...",  // 격식 있는 인사말
  gallery: ["images/gallery/formal-01.jpg", ...],  // 포멀한 사진 위주
  sections: {
    gallery: true,
    account: true,
    bus: true,    // 어른용은 버스 대절 표시
    rsvp: true,
  },
  bus: { info: "", formUrl: "" },
  rsvp: { formUrl: "" },
};
```

```javascript
// js/data-friends.js — 친구용 오버라이드
const weddingVariant = {
  greeting: "우리 결혼합니다! 🎉",  // 캐주얼한 인사말
  gallery: ["images/gallery/casual-01.jpg", ...],  // 자연스러운 사진 위주
  sections: {
    gallery: true,
    account: true,
    bus: false,   // 친구용은 버스 대절 숨김 (필요시 true)
    rsvp: true,
  },
  rsvp: { formUrl: "" },
};
```

`main.js`에서 `weddingCommon`과 `weddingVariant`를 머지하여 최종 데이터를 생성합니다:
```javascript
const weddingData = { ...weddingCommon, ...weddingVariant };
```

## 프로젝트 구조

```
/
├── index.html              # 루트 (버전 선택 or 리다이렉트)
├── seniors/
│   └── index.html          # 어른용 페이지 (data-seniors.js 로드)
├── friends/
│   └── index.html          # 친구용 페이지 (data-friends.js 로드)
├── css/
│   └── style.css           # 전체 스타일 (공유)
├── js/
│   ├── data-common.js      # 공통 데이터 (이름, 날짜, 장소, 계좌)
│   ├── data-seniors.js     # 어른용 데이터 (인사말, 갤러리, 섹션 on/off)
│   ├── data-friends.js     # 친구용 데이터 (인사말, 갤러리, 섹션 on/off)
│   ├── main.js             # 메인 로직 (렌더링, 이벤트)
│   └── animations.js       # 스크롤 애니메이션 (Intersection Observer)
├── images/
│   ├── cover.jpg
│   ├── gallery/
│   │   ├── 01.jpg
│   │   └── ...
│   └── og-image.jpg        # 카카오톡 공유 미리보기 이미지
├── CNAME                   # GitHub Pages 커스텀 도메인
└── README.md
```

### 템플릿 공유 방식
- `seniors/index.html`과 `friends/index.html`은 같은 HTML 구조
- 차이점은 `<script>` 태그에서 로드하는 데이터 파일만 다름:
  ```html
  <!-- seniors/index.html -->
  <script src="../js/data-common.js"></script>
  <script src="../js/data-seniors.js"></script>
  <script src="../js/main.js"></script>
  ```
  ```html
  <!-- friends/index.html -->
  <script src="../js/data-common.js"></script>
  <script src="../js/data-friends.js"></script>
  <script src="../js/main.js"></script>
  ```
- `main.js`는 `weddingData.sections` 값을 보고 섹션을 표시/숨김 처리

## 구현 요구사항

1. **성능**: 이미지 lazy loading (`loading="lazy"`), 적절한 이미지 사이즈, WebP 권장
2. **접근성**: 시맨틱 HTML, 적절한 aria 속성
3. **SEO**: 메타태그, Open Graph 태그 설정 (카카오톡 공유 시 미리보기)
4. **모바일 UX**: 터치 인터랙션, 적절한 터치 타겟 크기 (44px 이상)
5. **브라우저 호환**: iOS Safari, Android Chrome 기본 지원
6. **빌드 불필요**: 별도 빌드 과정 없이 파일 그대로 배포

## 배포 (GitHub Pages + 가비아 도메인)

### GitHub Pages 설정
1. 레포지토리 Settings → Pages → Source를 `main` 브랜치 `/root`로 설정
2. `CNAME` 파일에 커스텀 도메인 입력 (예: `wedding.example.com`)

### 가비아 DNS 설정
- A 레코드: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- 또는 CNAME 레코드: `<username>.github.io`
- GitHub Pages Settings에서 "Enforce HTTPS" 체크

## 로컬 개발

```bash
# 아무 정적 서버로 실행 (예시)
python3 -m http.server 3000
# 또는
npx serve .
# 브라우저에서 http://localhost:3000 접속
```
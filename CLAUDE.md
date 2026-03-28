# 우주 모바일 청첩장 페이지 개발

## 프로젝트 개요

모바일 최적화된 청첩장 웹페이지를 개발합니다. 모바일 퍼스트로 설계하되, 데스크톱에서도 깔끔하게 보이는 반응형 디자인을 적용합니다.

루트(`/`)에 단일 원페이지로 구성합니다.

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
- **캐러셀 (메인)**: 사진을 좌우 스와이프로 탐색. 터치/드래그 + 좌우 화살표 버튼. 하단에 도트 인디케이터
- **썸네일 액자 그리드**: 캐러셀 아래에 작은 액자 형태로 전체 사진 배치 (5칼럼 그리드, 15장 → 5x3 깨끗하게)
- 액자 클릭 시 캐러셀이 해당 사진으로 이동 (스크롤 + 슬라이드)
- 현재 캐러셀에 보이는 사진에 해당하는 액자는 테두리 하이라이트
- 사진은 GIF와 PNG 혼합 구성 (data.js에서 확장자로 구분)

### 4. 예식 장소 & 지도
- 예식장 이름 & 주소
- **Google Maps iframe 임베드** (API 키 불필요, `<iframe src="https://maps.google.com/maps?q=...">` 방식)
- 지도 앱 바로가기 버튼 3종:
  - "카카오내비로 보기" → `kakaomap://` 딪링크 (웹: `https://map.kakao.com/link/map/장소명,lat,lng`)
  - "네이버 지도로 보기" → `nmap://` 딪링크 (웹: `https://map.naver.com/...`)
  - "티맵으로 보기" → `tmap://` 딪링크
- 주차 안내, 지하철 안내 등 교통 정보
  - 2호선 역삼역 7번 출구 → GS타워 1층 직접 연결
  - GS타워 주차장 약 1,000대, 하객 4시간 무료

### 5. 마음 전하실 곳 (축의금 송금)
- 신랑측 / 신부측 탭 또는 아코디언
- 계좌번호 복사 버튼 (클립보드 복사 + 토스트 알림)
- 은행명, 예금주, 계좌번호 표시
- 카카오페이 송금 링크 (선택)

### 6. 푸터
- 카카오톡 공유하기 버튼 (Kakao JavaScript SDK 필요 — `developers.kakao.com`에서 앱 등록 후 JS 키 발급)
- 링크 복사 버튼 (API 키 불필요, `navigator.clipboard` 사용)
- 저작권 텍스트 (간단하게)

## 데이터 관리

모든 콘텐츠는 `js/data.js` 파일 하나에서 관리합니다. 내용만 수정하면 페이지에 자동 반영됩니다.

```javascript
// js/data.js
const weddingData = {
  groom: { name: "최재우", father: "최명심", mother: "한승희" },
  bride: { name: "이주연", father: "이재윤", mother: "진선숙" },
  date: "2026-06-06T18:30:00",
  greeting: "",
  location: {
    name: "역삼 아모리스",
    address: "서울특별시 강남구 논현로 508 GS타워",
    hall: "",
    mapCoord: { lat: 37.5014, lng: 127.0373 },
  },
  // 캐러셀 + 썸네일 액자 갤러리
  // type: "gif" | "png" — 사진별 포맷 구분
  gallery: [
    { src: "https://picsum.photos/seed/w1/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w2/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w3/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w4/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w5/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w6/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w7/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w8/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w9/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w10/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w11/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w12/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w13/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w14/800/600", type: "png" },
    { src: "https://picsum.photos/seed/w15/800/600", type: "png" },
  ],
  accounts: {
    groom: [{ bank: "", holder: "", number: "" }],
    bride: [{ bank: "", holder: "", number: "" }],
  },
  share: {
    kakaoKey: "73535e288dd4f87655f8b52f5670810c",
  },
};
```

## 프로젝트 구조

```
/
├── index.html              # 메인 페이지 (원페이지)
├── css/
│   └── style.css           # 전체 스타일
├── js/
│   ├── data.js             # 콘텐츠 데이터 (이것만 수정)
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
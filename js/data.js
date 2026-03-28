// js/data.js — 모든 콘텐츠 데이터 (이것만 수정)
const weddingData = {
  groom: {
    name: "최재우",
    nameEn: "Choi Jaewoo",
    father: "최명심",
    mother: "한승희",
    phone: "010-8536-7097",           // 신랑 연락처 (예: "010-1234-5678")
    fatherPhone: "010-3785-2411",     // 신랑 아버지 연락처
    motherPhone: "010-6635-1553",     // 신랑 어머니 연락처
  },
  bride: {
    name: "이주연",
    nameEn: "Lee Juyeon",
    father: "이재윤",
    mother: "진선숙",
    phone: "010-9524-3340",           // 신부 연락처
    fatherPhone: "010-5455-3131",     // 신부 아버지 연락처
    motherPhone: "010-4432-3131",     // 신부 어머니 연락처
  },
  date: "2026-06-06T18:30:00",
  greeting: `저희 두 사람이 사랑과 믿음으로
한 길을 걷고자 합니다.

바쁘신 중에도 부디 오시어
자리를 빛내 주시면
더없는 기쁨이 되겠습니다.`,
  greetingTitle: "결혼합니다",
  location: {
    name: "역삼 아모리스",
    address: "서울특별시 강남구 논현로 508 GS타워",
    hall: "",
    tel: "02-2005-1011",
    transport: [
      "지하철 2호선 역삼역 하차 → 7번 출구 방향으로 이동",
      "GS타워 1층으로 직접 연결 (지하로 나가지 않고 접근 가능)",
    ],
    parking: "GS타워 주차장 (약 1,000대 수용) · 하객 주차 4시간 무료",
    mapCoord: { lat: 37.5014, lng: 127.0373 },
    kakaoMapUrl: "https://kko.to/IhJ0Tkv_yV",
    naverMapUrl: "https://naver.me/5jJT0pXb",
    tmapUrl: "https://tmap.life/820290bb",
  },
  // 커버 배경 슬라이드쇼 (25장, gif/png 혼합)
  // type: "gif" | "png" — GIF는 애니메이션 재생됨
  coverPhotos: [
    { src: "images/cover/main.jpg", type: "png" },
    // 슬라이드쇼 사진 준비되면 아래에 추가
    // { src: "images/cover/02.gif", type: "gif" },
  ],

  // 캐러셀 + 썸네일 액자 갤러리
  // type: "gif" | "png" — 사진별 포맷 구분
  gallery: [
    { src: "images/gallery/1.webp", type: "png" },
    { src: "images/gallery/2.webp", type: "png" },
    { src: "images/gallery/3.webp", type: "png" },
    { src: "images/gallery/3_2.gif", type: "gif" },
    { src: "images/gallery/4.webp", type: "png" },
    { src: "images/gallery/5.webp", type: "png" },
    { src: "images/gallery/6.webp", type: "png" },
    { src: "images/gallery/6_2.gif", type: "gif" },
    { src: "images/gallery/7.webp", type: "png" },
    { src: "images/gallery/8.webp", type: "png" },
    { src: "images/gallery/9.webp", type: "png" },
    { src: "images/gallery/10_1.webp", type: "png" },
    { src: "images/gallery/10_2.gif", type: "gif" },
    { src: "images/gallery/11.webp", type: "png" },
    { src: "images/gallery/13.webp", type: "png" },
    { src: "images/gallery/14.webp", type: "png" },
    { src: "images/gallery/15.webp", type: "png" },
    { src: "images/gallery/16.webp", type: "png" },
    { src: "images/gallery/17.webp", type: "png" },
    { src: "images/gallery/18.webp", type: "png" },
    { src: "images/gallery/19.webp", type: "png" },
    { src: "images/gallery/19_1.gif", type: "gif" },
    { src: "images/gallery/20.webp", type: "png" },
    { src: "images/gallery/21_1.webp", type: "png" },
    { src: "images/gallery/21_2.gif", type: "gif" },
  ],
  accounts: {
    groom: [
      { bank: "우리은행", holder: "최재우", number: "1002-453-296096" },
      { bank: "우리은행", holder: "최명심", number: "143-129143-02-003" },
    ],
    bride: [
      { bank: "토스뱅크", holder: "이주연", number: "1000-6241-5323" },
      { bank: "하나은행", holder: "이재윤", number: "628-910245-77407" },
    ],
  },
  share: {
    kakaoKey: "73535e288dd4f87655f8b52f5670810c",
    title: "최재우 ♥ 이주연 결혼합니다",
    description: "2026년 6월 6일 토요일 오후 6시 30분\n역삼 아모리스",
    imageUrl: "https://picsum.photos/seed/wedding-share/600/400",
  },
};

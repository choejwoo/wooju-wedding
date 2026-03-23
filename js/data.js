// js/data.js — 모든 콘텐츠 데이터 (이것만 수정)
const weddingData = {
  groom: {
    name: "최재우",
    nameEn: "Choi Jaewoo",
    father: "최명심",
    mother: "한승희",
  },
  bride: {
    name: "이주연",
    nameEn: "Lee Juyeon",
    father: "이재윤",
    mother: "진선숙",
  },
  date: "2026-06-06T18:30:00",
  greeting: "",
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
    tmapUrl: "tmap://route?rGoName=아모리스%20역삼&rGoX=127.0373&rGoY=37.5014",
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
    groom: [
      { bank: "", holder: "", number: "" },
    ],
    bride: [
      { bank: "", holder: "", number: "" },
    ],
  },
  share: {
    kakaoKey: "73535e288dd4f87655f8b52f5670810c",
    title: "최재우 ♥ 이주연 결혼합니다",
    description: "2026년 6월 6일 토요일 오후 6시 30분\n역삼 아모리스",
    imageUrl: "https://your-domain.com/images/og-image.jpg",
  },
};

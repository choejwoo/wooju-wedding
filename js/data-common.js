// js/data-common.js — 두 버전이 공유하는 데이터
const weddingCommon = {
  groom: {
    name: "이우주",
    nameEn: "Lee Wooju",
    father: "이○○",
    mother: "김○○",
  },
  bride: {
    name: "박은빛",
    nameEn: "Park Eunbit",
    father: "박○○",
    mother: "최○○",
  },
  date: "2026-05-30T11:00:00",
  dateText: "2026년 5월 30일 토요일 오전 11시",
  location: {
    name: "더채플앳청담",
    address: "서울특별시 강남구 청담동 100-1",
    hall: "채플홀 3층",
    tel: "02-000-0000",
    transport: [
      "지하철 7호선 청담역 2번 출구 도보 5분",
      "버스 141, 144, 145 청담역 하차",
    ],
    parking: "건물 내 주차 가능 (2시간 무료)",
    mapCoord: { lat: 37.5245, lng: 127.0492 },
    kakaoMapUrl: "https://map.kakao.com/link/map/더채플앳청담,37.5245,127.0492",
    naverMapUrl: "https://map.naver.com/v5/search/더채플앳청담",
    tmapUrl: "https://tmap.life/route?goalname=더채플앳청담&goalx=127.0492&goaly=37.5245",
  },
  accounts: {
    groom: [
      { bank: "카카오뱅크", holder: "이우주", number: "3333-00-0000000" },
    ],
    bride: [
      { bank: "국민은행", holder: "박은빛", number: "000000-00-000000" },
    ],
  },
  share: {
    kakaoKey: "YOUR_KAKAO_JAVASCRIPT_KEY",
    title: "이우주 ♥ 박은빛 결혼합니다",
    description: "2026년 5월 30일 토요일 오전 11시\n더채플앳청담 채플홀 3층",
    imageUrl: "https://your-domain.com/images/og-image.jpg",
  },
};

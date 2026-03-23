// js/data-variants.js — 버전별 데이터 (seniors / friends)
const weddingVariants = {
  seniors: {
    version: "seniors",
    greeting: `저희 두 사람이 사랑과 믿음으로 한 길을 걷고자 합니다.
바쁘신 중에도 부디 오시어 자리를 빛내 주시면
더없는 기쁨이 되겠습니다.`,
    greetingTitle: "결혼합니다",
    gallery: [
      "images/gallery/01.jpg",
      "images/gallery/02.jpg",
      "images/gallery/03.jpg",
      "images/gallery/04.jpg",
      "images/gallery/05.jpg",
      "images/gallery/06.jpg",
    ],
    sections: {
      gallery: true,
      account: true,
      bus: true,
      rsvp: true,
    },
    bus: {
      info: "하객분들의 편의를 위해 버스를 운행합니다.",
      routes: [
        {
          departure: "강남역 11번 출구 앞",
          time: "오전 10:00",
          returnTime: "오후 1:00",
        },
      ],
      formUrl: "https://forms.gle/YOUR_BUS_FORM_ID",
      note: "버스 탑승 신청은 5월 23일(토)까지 해주시면 감사합니다.",
    },
    rsvp: {
      formUrl: "https://forms.gle/YOUR_RSVP_FORM_ID",
      deadline: "2026년 5월 23일",
    },
  },

  friends: {
    version: "friends",
    greeting: `우리 드디어 결혼합니다! 🎉
두 사람의 소중한 시작을 함께해줘서 고마워.
꼭 와줘, 기다릴게!`,
    greetingTitle: "우리 결혼해요 🤍",
    gallery: [
      "images/gallery/01.jpg",
      "images/gallery/02.jpg",
      "images/gallery/03.jpg",
      "images/gallery/04.jpg",
      "images/gallery/05.jpg",
      "images/gallery/06.jpg",
      "images/gallery/07.jpg",
      "images/gallery/08.jpg",
    ],
    sections: {
      gallery: true,
      account: true,
      bus: false,
      rsvp: true,
    },
    rsvp: {
      formUrl: "https://forms.gle/YOUR_RSVP_FORM_ID",
      deadline: "2026년 5월 23일",
    },
  },
};

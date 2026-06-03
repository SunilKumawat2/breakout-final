import card1 from "@/images/es-main-img.jpg";
import card2 from "@/images/pr-main-img.jpg";
import card3 from "@/images/cr-main-img.jpg";

import hmimg1 from "@/images/hm-img1.jpg";
import hmimg2 from "@/images/hm-img2.jpg";
import hmimg3 from "@/images/hm-img3.jpg";
import hmimg4 from "@/images/hm-img4.jpg";

const HomeCards = [
  {
    title: "Escape Room",
    img: card1,
    link: "/escape-room",
    links: [
      {
        title: "Koramangala",
        link: "/",
      },
      {
        title: "JP Nagar",
        link: "/",
      },
      {
        title: "Whitefield",
        link: "/",
      },
    ],
  },
  {
    title: "Parties",
    img: card2,
    link: "/parties",
    links: [
      {
        title: "Koramangala",
        link: "/",
      },
      {
        title: "Whitefield",
        link: "/",
      },
    ],
  },
  {
    title: "Corporate",
    img: card3,
    link: "/corporate-room",
    links: [
      {
        title: "Koramangala",
        link: "/",
      },
      {
        title: "JP Nagar",
        link: "/",
      },
      {
        title: "Whitefield",
        link: "/",
      },
    ],
  },
];

const LookignFor = [
  {
    title: "Escape Room",
    links: [
      {
        title: "Koramangala",
        link: "/",
      },
      {
        title: "JP Nagar",
        link: "/",
      },
      {
        title: "Whitefield",
        link: "/",
      },
    ],
  },
  {
    title: "Parties",
    links: [
      {
        title: "Birthday",
        link: "/",
      },
      {
        title: "Bachelors",
        link: "/",
      },
      {
        title: "Farewell",
        link: "/",
      },
    ],
  },
  {
    title: "Corporate",
    links: [
      {
        title: "Team Outing",
        link: "/",
      },
      {
        title: "Culture Setting",
        link: "/",
      },
      {
        title: "Employee Engagement",
        link: "/",
      },
      {
        title: "Learning & Development",
        link: "/",
      },
    ],
  },
];

const scoreCard = [
  {
    score: "7831+",
    title: "Positive feedback",
    desc: "Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo ",
    img: hmimg1,
  },
  {
    score: "47051+",
    title: "Player Hosted",
    desc: "Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo ",
    img: hmimg2,
  },
  {
    score: "4.8 Star",
    title: "Positive feedback",
    desc: "Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo ",
    img: hmimg3,
  },
  {
    score: "170+",
    title: "Brand Collaboration",
    desc: "Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo Xoxo xox xo ",
    img: hmimg4,
  },
];

const HomePageData = {
  cards: HomeCards,
  lookingFor: LookignFor,
  scoreCard: scoreCard,
};

export default HomePageData;

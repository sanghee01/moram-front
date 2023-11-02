import { atom } from "recoil";

interface IPost {
  id: number;
  userId: number;
  nickname: string;
  writeTime: string;
  updateTime: string;
  title: string;
  content: string;
  imgUrl: string[];
  likesCount: number;
  hitCount: number;
  category: string;
  tag: string;
}

export const userState = atom<any | null>({
  key: "userState",
  default: null,
});

export const postingState = atom<any | null>({
  key: "postingState",
  default: null,
});

export const lastIdState = atom<number>({
  key: "lastIdState",
  default: 99999,
});

export const postAtom = atom<IPost[]>({
  key: "postAtom",
  default: [
    {
      id: 1,
      userId: 1,
      nickname: "상추에삼겹살",
      writeTime: "2023-10-11 12:00:01",
      updateTime: "2023-10-11 12:04:10",
      title: "알고리즘 공부하는 방법",
      content:
        "일단 먼저 자료구조를 공부합니다. 그 동시에 백준, 프로그래머스와 같은 사이트를 통해 문제를 풀어요.",
      imgUrl: [
        "https://cdnimage.dailian.co.kr/news/202010/news_1602750704_927720_m_1.png",
        "https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg",
      ],
      likesCount: 17,
      hitCount: 153,
      category: "컴퓨터공학과",
      tag: "취업",
    },
    {
      id: 2,
      userId: 2,
      nickname: "철학의신",
      writeTime: "2023-10-13 12:12:01",
      updateTime: "2023-10-16 15:04:10",
      title: "철학이란?",
      content:
        "철학은 세계와 인간의 삶에 대한 근본 원리 즉 인간의 본질, 세계관 등을 탐구하는 학문이다. 또한 존재, 지식, 가치, 이성, 인식 그리고 언어, 논리, 윤리 등의 일반적이며 기본적인 대상의 실체를 연구하는 학문이다. 이 말은 프로타고라스에 의해서 만들어졌다고 한다.",
      imgUrl: ["https://img.hankyung.com/photo/201706/AA.14117791.1.jpg"],
      likesCount: 14,
      hitCount: 222,
      category: "철학과",
      tag: "자유",
    },
    {
      id: 3,
      userId: 3,
      nickname: "피카츄",
      writeTime: "2023-10-12 12:20:01",
      updateTime: "2023-10-13 15:04:10",
      title: "전기에 대해 알아보자",
      content: "전기는 사실 피카츄가 만들어낸다.",
      imgUrl: [
        "https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg",
      ],
      likesCount: 12,
      hitCount: 86,
      category: "전기공학과",
      tag: "자유",
    },
    {
      id: 4,
      userId: 1,
      nickname: "상추에삼겹살",
      writeTime: "2023-10-13 12:20:01",
      updateTime: "2023-10-14 15:04:10",
      title: "React 스터디 구합니다",
      content:
        "React 기초부터 같이 학습하실 분 구합니다. 어느정도 공부 후 프로젝트도 할 예정입니다.",
      imgUrl: ["https://react.dev/images/home/conf2021/cover.svg"],
      likesCount: 10,
      hitCount: 86,
      category: "컴퓨터공학과",
      tag: "스터디",
    },
    {
      id: 5,
      userId: 2,
      nickname: "철학의신",
      writeTime: "2023-10-15 12:20:01",
      updateTime: "2023-10-15 15:04:10",
      title: "세무사 합격 수기",
      content:
        "드디어 부족한 필력이지만 수험 생활을 준비하시는 분들에게 조금이나마 도움이 되고자 이렇게 합격 수기를 씁니다.",
      imgUrl: [
        "https://cdn.pixabay.com/photo/2018/02/15/19/42/sunset-3156176_1280.jpg",
      ],
      likesCount: 10,
      hitCount: 86,
      category: "철학과",
      tag: "취업",
    },
    {
      id: 6,
      userId: 3,
      nickname: "피카츄",
      writeTime: "2023-10-16 12:20:01",
      updateTime: "2023-10-17 15:04:10",
      title: "SW AI 교육 여름 새싹캠프",
      content:
        "안녕하세요! 새싹캠프 같이하실 분 구해요. 링크 첨부합니다. 내용 읽어보시고 같이 하고 싶으신분 오픈채팅방으로 들어와주시면 감사하겠습니다.",
      imgUrl: ["https://www.all-con.co.kr/data/poster/2306/499440.png"],
      likesCount: 10,
      hitCount: 86,
      category: "전기공학과",
      tag: "자유",
    },
    {
      id: 7,
      userId: 4,
      nickname: "쿼카맹구",
      writeTime: "2023-10-17 12:20:01",
      updateTime: "2023-10-17 15:04:10",
      title: "기상 영어 회화 스터디",
      content:
        "안녕하세요. 주 3회정도 영어 회화 스터디하실 분 계실까요? 10분 분량의 TED 시청 후 영어로 토론 해보는 시간을 가질까합니다! 더 자세한건 같이 논의해봐요.",
      imgUrl: ["https://ichef.bbci.co.uk/images/ic/1200x675/p0bdk7l0.jpg"],
      likesCount: 10,
      hitCount: 86,
      category: "사회학과",
      tag: "스터디",
    },
  ],
});

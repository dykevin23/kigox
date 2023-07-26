export interface Child {
  birthday: string;
  gender: string;
}

type Provider = "naver" | "kakao";

export interface User {
  name: string;
  email: string;
  provider: Provider;
  profile: Profile;
  children: Child[];
}

interface Profile {
  birthday: string;
  gender: string;
  mobile: string;
  zonecode?: string;
  address: string;
  detailAddress: string;
  latitude?: number;
  longitude?: number;
  incomeRange: string;
}

export const userList: User[] = [
  {
    email: "user1@naver.com",
    name: "홍길동1",
    provider: "naver",
    profile: {
      birthday: "19880613",
      gender: "female",
      mobile: "01038483948",
      address: "서울 강남구 삼성로 11",
      detailAddress: "301동 108호",
      incomeRange: "1",
    },
    children: [{ birthday: "20230223", gender: "male" }],
  },
  {
    email: "user2@naver.com",
    name: "홍길동2",
    provider: "naver",
    profile: {
      birthday: "19830304",
      gender: "female",
      mobile: "01098479238",
      address: "서울 송파구 송파대로 567",
      detailAddress: "527동 1307호",
      incomeRange: "2",
    },
    children: [{ birthday: "20230323", gender: "male" }],
  },
  {
    email: "user3@naver.com",
    name: "홍길동3",
    provider: "naver",
    profile: {
      birthday: "19940502",
      gender: "male",
      mobile: "01039487229",
      address: "서울 광진구 아차산로 262",
      detailAddress: "101동 101호",
      incomeRange: "0",
    },
    children: [{ birthday: "20221118", gender: "female" }],
  },
  {
    email: "user4@naver.com",
    name: "홍길동4",
    provider: "naver",
    profile: {
      birthday: "19780201",
      gender: "female",
      mobile: "01048573944",
      address: "서울 송파구 송파대로 345 헬리오시티",
      detailAddress: "404동 102호",
      incomeRange: "3",
    },
    children: [{ birthday: "20220829", gender: "female" }],
  },
  {
    email: "user5@naver.com",
    name: "홍길동5",
    provider: "naver",
    profile: {
      birthday: "19890312",
      gender: "male",
      mobile: "01022349983",
      address: "서울 용산구 새창로 70",
      detailAddress: "101동 101호",
      incomeRange: "2",
    },
    children: [
      { birthday: "20220106", gender: "male" },
      { birthday: "20230701", gender: "female" },
    ],
  },
  {
    email: "user6@naver.com",
    name: "홍길동6",
    provider: "naver",
    profile: {
      birthday: "19870222",
      gender: "female",
      mobile: "01087773844",
      address: "서울 영등포구 신길로28길 9",
      detailAddress: "101동 101호",
      incomeRange: "3",
    },
    children: [
      { birthday: "20210901", gender: "female" },
      { birthday: "20230102", gender: "female" },
    ],
  },
  {
    email: "user7@naver.com",
    name: "홍길동7",
    provider: "naver",
    profile: {
      birthday: "19840519",
      gender: "female",
      mobile: "01087332212",
      address: "서울 강남구 언주로 332",
      detailAddress: "101동 101호",
      incomeRange: "2",
    },
    children: [
      { birthday: "20200304", gender: "male" },
      { birthday: "20210803", gender: "male" },
      { birthday: "20230101", gender: "male" },
    ],
  },
  {
    email: "user8@naver.com",
    name: "홍길동8",
    provider: "naver",
    profile: {
      birthday: "19900201",
      gender: "male",
      mobile: "01012339948",
      address: "서울 영등포구 국제금융로7길 27",
      detailAddress: "101동 101호",
      incomeRange: "3",
    },
    children: [
      { birthday: "20190304", gender: "female" },
      { birthday: "20210902", gender: "male" },
    ],
  },
  {
    email: "user9@naver.com",
    name: "홍길동9",
    provider: "naver",
    profile: {
      birthday: "19930122",
      gender: "female",
      mobile: "01087339944",
      address: "서울 은평구 응암로30길 16",
      detailAddress: "101동 101호",
      incomeRange: "3",
    },
    children: [
      { birthday: "20200405", gender: "male" },
      { birthday: "20220901", gender: "female" },
    ],
  },
  {
    email: "user10@naver.com",
    name: "홍길동10",
    provider: "naver",
    profile: {
      birthday: "19920202",
      gender: "female",
      mobile: "01022394854",
      address: "서울 도봉구 해등로 50",
      detailAddress: "101호",
      incomeRange: "1",
    },
    children: [{ birthday: "20210829", gender: "male" }],
  },
  {
    email: "user1@kakao.com",
    name: "이순신1",
    provider: "kakao",
    profile: {
      birthday: "19910201",
      gender: "female",
      mobile: "01069583321",
      address: "서울 성북구 성북로4길 52",
      detailAddress: "101동 101호",
      incomeRange: "0",
    },
    children: [
      { birthday: "20200909", gender: "female" },
      { birthday: "20220901", gender: "female" },
    ],
  },
  {
    email: "user2@kakao.com",
    name: "이순신2",
    provider: "kakao",
    profile: {
      birthday: "19830223",
      gender: "male",
      mobile: "01012993384",
      address: "서울 성동구 금호로 100",
      detailAddress: "101동 101호",
      incomeRange: "4",
    },
    children: [
      { birthday: "20191202", gender: "male" },
      { birthday: "20210803", gender: "female" },
    ],
  },
  {
    email: "user3@kakao.com",
    name: "이순신3",
    provider: "kakao",
    profile: {
      birthday: "19930304",
      gender: "female",
      mobile: "01029384456",
      address: "서울 성동구 독서당로 218",
      detailAddress: "101동 101호",
      incomeRange: "1",
    },
    children: [
      { birthday: "20180909", gender: "female" },
      { birthday: "20231029", gender: "male" },
    ],
  },
  {
    email: "user4@kakao.com",
    name: "이순신4",
    provider: "kakao",
    profile: {
      birthday: "19880422",
      gender: "female",
      mobile: "01029338456",
      address: "서울 서초구 서초중앙로29길 28",
      detailAddress: "101동 101호",
      incomeRange: "2",
    },
    children: [
      { birthday: "20170703", gender: "male" },
      { birthday: "20190203", gender: "male" },
      { birthday: "20230504", gender: "female" },
    ],
  },
  {
    email: "user5@kakao.com",
    name: "이순신5",
    provider: "kakao",
    profile: {
      birthday: "19950301",
      gender: "male",
      mobile: "01093847732",
      address: "서울 강동구 상암로51길 61",
      detailAddress: "101동 101호",
      incomeRange: "1",
    },
    children: [{ birthday: "20211102", gender: "female" }],
  },
  {
    email: "user6@kakao.com",
    name: "이순신6",
    provider: "kakao",
    profile: {
      birthday: "19820523",
      gender: "female",
      mobile: "01083749923",
      address: "서울 양천구 중앙로29길 61",
      detailAddress: "101동 101호",
      incomeRange: "2",
    },
    children: [
      { birthday: "20200108", gender: "female" },
      { birthday: "20220604", gender: "female" },
    ],
  },
  {
    email: "user7@kakao.com",
    name: "이순신7",
    provider: "kakao",
    profile: {
      birthday: "19950301",
      gender: "male",
      mobile: "01083774493",
      address: "서울 동작구 서달로 91",
      detailAddress: "101동 101호",
      incomeRange: "1",
    },
    children: [{ birthday: "20230329", gender: "male" }],
  },
  {
    email: "user8@kakao.com",
    name: "이순신8",
    provider: "kakao",
    profile: {
      birthday: "19780129",
      gender: "female",
      mobile: "01019283374",
      address: "서울 동작구 장승배기로4길 9",
      detailAddress: "101동 101호",
      incomeRange: "2",
    },
    children: [{ birthday: "20220813", gender: "male" }],
  },
  {
    email: "user9@kakao.com",
    name: "이순신9",
    provider: "kakao",
    profile: {
      birthday: "19720829",
      gender: "female",
      mobile: "01029387748",
      address: "서울 성북구 보문로29다길 31",
      detailAddress: "101동 101호",
      incomeRange: "4",
    },
    children: [
      { birthday: "20201209", gender: "female" },
      { birthday: "20220426", gender: "male" },
    ],
  },
  {
    email: "user10@kakao.com",
    name: "이순신10",
    provider: "kakao",
    profile: {
      birthday: "19740910",
      gender: "male",
      mobile: "01098337485",
      address: "서울 마포구 백범로25길 63",
      detailAddress: "101동 101호",
      incomeRange: "4",
    },
    children: [{ birthday: "20190330", gender: "male" }],
  },
];

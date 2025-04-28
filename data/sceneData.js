export const sceneData = {
  hospital_entrance: {
    id: 'hospital_entrance',
    background: require('../assets/backgrounds/hospital_outside.png'),
    object: null,
    text: '중앙성당으로 향하는 길, 낡은 폐병원을 발견하였다. \n 사람의 발길이 끊긴 지 꽤 되어보였다. \n\n 들어가볼까?',
    choices: [
      { text: '폐병원에 들어간다', next: 'hospital_inside' },
      { text: '왠지 불길하다… 돌아선다', next: 'gpt_encounter' },
    ],
  },

  hospital_inside: {
    id: 'hospital_inside',
    background: require('../assets/backgrounds/hospital_inside.png'),
    object: null,
    text: '내부로 들어섰다\n불빛이 없어 아무것도 보이지 않는다.\n피냄새가 난다..\n\n계속 탐색할까?',
    choices: [
      { text: '어둠 속을 더듬어 나아간다', next: 'book_event' },
      { text: '들어오자마자 나간다', next: 'hospital_exit' },
    ],
  },

  book_event: {
    id: 'book_event',
    background: require('../assets/backgrounds/hospital_inside.png'),
    object: require('../assets/objects/book_closeup.png'),
    objectStyle: { top: '52%', width: 180, height: 140 },
    isGPTNote: true,
    text: 'GPT님을 찬양해라!\n\n 책 초입부터 이런 문구가 적혀있다.\n 이게 그 사이비 집단의 성서인 듯하다..',
    choices: [
      { text: '계속 읽는다.', next: 'trap_death', effect: { iq: -1 } },
      { text: '무시하고 복도로 이동한다', next: 'hospital_hallway' },
    ],
  },
  
  trap_death: {
    id: 'trap_death',
    background: require('../assets/backgrounds/hospital_inside.png'),
    object: require('../assets/objects/gpt_drone.png'),
    text: '그 순간, 어딘가에서 붉은 빛이 깜박이기 시작한다.\n생체 탐지용 드론이었다.\n아..함정이었다.\n\n<span style="color:red">데이터 수집 완료. 위치 추적 중. 연결 시도…</span>',
    choices: [],
  },

  hospital_hallway: {
    id: 'hospital_hallway',
    background: require('../assets/backgrounds/hospital_hallway.png'),
    object: null,
    text: '복도를 따라가던 중, 벽에 손톱으로 긁은 듯한 메시지를 발견한다.\n\n“나… 나만 멀쩡해… 나만… 나만…”',
    choices: [
      { text: '응급실로 향한다', next: 'low_iq_encounter' },
      { text: '뒤로 돌아간다', next: 'hospital_exit' },
    ],
  },

  low_iq_encounter: {
    id: 'low_iq_encounter',
    background: require('../assets/backgrounds/hospital_hallway.png'),
    object: require('../assets/objects/멍청이.png'),
    objectStyle: {
      top: '23%',
      width: 300,
      height: 300,
      left: '10%',
    },
    text: '응급실로 향하던 길목. \n인간으로 보이는 무언가가 어깨를 들썩이며 웃고 있었다.\n“안녕하떼여어..으헤헤헤....”\n\n 지능을 보니 인간은 맞는 것 같다. 어떡할까?',
    choices: [
      { text: '무시하고 지나친다', next: 'er_room' },
      { text: '대화한다', next: 'trap_death' },
    ],
  },

  er_room: {
    id: 'er_room',
    background: require('../assets/backgrounds/hospital_er.png'),
    object: require('../assets/objects/인형.png'),
    objectStyle: {
      top: '42%',
      width: 250,
      height: 250,
      left: '40%',
    },
    text: '응급실 내부. 벽에 기대선 병원 침대에 인형이 놓여 있다. 인형의 눈은 무언가를 따라가듯 돌아간다.',
    choices: [
      { text: '인형의 눈이 향하는 곳을 본다', next: 'newspaper_event' },
      { text: '"으, 징그러워.."\n서둘러 자리를 뜬다', next: 'hospital_exit' },
    ],
  },

  newspaper_event: {
    id: 'newspaper_event',
    background: require('../assets/backgrounds/hospital_er.png'),
    object: require('../assets/objects/newspaper.png'),
    objectStyle: {
      top: '42%',
      width: 200,
      height: 200,
      left: '28%',
    },
    text: '《!!중알일보 10주년 기념 : 오싹오싹 공포 퀴즈!!》\n\n "이게 뭐야..??갑자기?”',
    choices: [
      { text: '꿀잼!!풀어본다!', next: 'quiz_answer' },
      {text: '안 풀래..', next: 'hospital_exit'},
    ],
  },

  quiz_answer: {
    id: 'quiz_answer',
    background: require('../assets/backgrounds/hospital_er.png'),
    object: require('../assets/questions/공포퀴즈.jpg'),
    objectStyle: {
      top: '30%',
      width: 300,
      height: 300,
      left: '12%',
    },
    text: '누가 진짜 엄마일까?',
    choices: [
      { text: '1층', next: 'hospital_exit', effect: { iq: +1 } },
      { text: '2층', next: 'hospital_exit' },
      { text: '없다.', next: 'hospital_exit' },
      { text: '내가 니 엄마다.', next: 'hospital_exit' },
    ],
  },

  hospital_exit: {
    id: 'hospital_exit',
    background: require('../assets/backgrounds/hospital_outside.png'),
    object: null,
    text: '당신은 무사히 병원을 빠져나왔다. 하지만 기분 탓인지, 등 뒤에 따가운 시선이 느껴진다.',
    choices: [
      { text: '중앙성당으로 향한다', next: 'church_outside' },
      { text: '중앙대 강당으로 기기릿!!', next: 'gpt_encounter' },
    ],
  },

  gpt_encounter: {
    id: 'gpt_encounter',
    background: require('../assets/backgrounds/commonbackground.png'),
    object: require('../assets/objects/gpt_drone.png'),
    sound: require('../assets/sounds/지피티공격.mp3'),
    dynamicText: (iq) => {
      if (iq === 0) {
        return '드론이 머리 위를 떠다닌다.\n\n“지능 없음. 추적 불필요.”';
      } else {
        return '빨간 불빛이 당신의 얼굴에 쏟아진다.\n“감지됨… 분석 중…”';
      }
    },
    dynamicChoices: (iq) => {
      if (iq === 0) {
        return [{ text: '깜짝아!!\n휴..내가 바보라 다행이야', next: 'cau_outside' }];
      } else {
        return [
          { text: '더러운 쓰레기통 안에 잠시 숨는다.', next: 'cau_outside', effect: { iq: +1, evolve: true } },
          { text: '소리를 지른다', next: 'detected_ending' },
        ];
      }
    },
  },

  cau_outside: {
    id: 'cau_outside',
    background: require('../assets/backgrounds/cau_outside.png'),
    object: null,
    text: '"여기가 바로 그 대단한 대학교, 중앙대학교!?\n생각해보니 지침서에도..중앙대 강당으로 오라 했지.."\n강당으로 갈까?',
    choices:[
      {text: '뭔소리야!!그건 낚시잖아. 그냥 안전하게 중앙성당으로 가자.', next: 'church_outside'},
      {text: '거기서 뭔 얘기를 할 지 궁금하긴 해..가보자.', next: 'cau_darkgd'},
    ],


  },

  cau_darkgd: {
    id: 'cau_darkgd',
    background: require('../assets/backgrounds/cau_darkgd.png'),
    object: null,
    text: '사람들은 미동도 없이 가만히 앉아있다..\n 어떡하지?',
    choices:[
      {text: '자연스레 빈자리에 앉는다..', next:'cau_brightgd'},
      {text:'아아아악!!!!!!!!', next:'detected_ending' },
    
    ],

  },
  
  cau_brightgd: {
    id:'cau_brightgd',
    background: require('../assets/backgrounds/cau_brightgd.png'),
    object: null,
    sound: require('../assets/sounds/박수.mp3'),
    text: '와아아아!!!!!!\n함성 소리와 함께 연설이 시작되었다..\n\n GPT에 대한 찬양만 가득하다.\n벌써 2시간째..\n\n 지루하다..이만 나가야겠다.',
    choices:[
      {text: '뒷문으로 조용히 나가자..', next: 'boy_encounter'},
      
    ],

  },

  boy_encounter: {
    id: 'boy_encounter',
    background: require('../assets/backgrounds/음침이.png'),
    object: null,
    text: '툭툭-.\n조용히 앉아만 있던 옆자리 남자가 \n내 어깨를 두드렸다..\n남자는 나에게 쪽지를 건네주고는 창문을 가리켰다.',
    choices:[
      {text: '창문으로 나간다', next:'cau_road'},
      {text: '무시하고 뒷문으로 나간다..', next: 'detected_ending'},

    ],
  },

  cau_road:{
    id:'cau_road',
    background: require('../assets/backgrounds/cau_길거리.png'),
    object: null,
    text: '휴, 무사히 나왔다!!\n음침하게 생겼던데\n생각보다 착한 사람이었잖아?',
    choices:[
      {text: '쪽지를 열어보자', next:'note'},
    ],
  },

  note:{
    id:'note',
    background: require('../assets/backgrounds/cau_길거리.png'),
    object: require('../assets/objects/쪽지.png'),
    text: '노란 빛의 사슴을 타고\n그가 인도하는 곳으로 가라..',
    choices:[
      {text: '사슴이라면..디어!?', next:'dear'},
      {text: '사슴이 여기 어딨어;;걍 걸어다닐래..', next:'detected_ending'},
    ],

  },
  dear:{
    id: 'dear',
    background: require('../assets/backgrounds/cau_길거리.png'),
    object: require('../assets/objects/디어.png'),
    objectStyle: {
      top: '42%',
      width: 300,
      height: 300,
      left: '10%',
    },
    text: '유일하게 멀쩡한 디어를 발견했다!',
    sound: require('../assets/sounds/발견.mp3'),
    choices:[
      {text: '당장 타자!', next:'riding'},
      {text: '위험해보여...그냥 걸을래', next:'detected_ending'},
    ],

  },

  riding:{
    id: 'riding',
    background: require('../assets/backgrounds/riding.png'),
    object: null,
    sound: require('../assets/sounds/부르릉.mp3'),
    text: '디어는 최고속력으로 달리기 시작했다!!\n 드론조차 그 움직임을 잡아내지 못하는 것 같다.\n\n정해진 목적지가 대체 어딜까?',
    choices:[
      {text: '오늘 너무 긴 여정을 했어..쉬고싶어..', next: 'bunker_entrance'},
      {text:'목적지라면..역시 중앙성당일까', next: 'church_outside'},
    ],
  },
  detected_ending: {
    id: 'detected_ending',
    background: require('../assets/backgrounds/gpt_death.png'),
    sound: require('../assets/sounds/너무길어.mp3'),
    object: null,
    text: '[AI에 의해 당신은 수거되었습니다.]\n\n생존 불가',
    choices: [],
  },

  church_outside: {
    id: 'church_outside',
    background: require('../assets/backgrounds/church_outside.png'),
    object: null,
    text: '붉은 십자가가 하늘을 뚫을 듯이 빛나고 있다.\n 마치 나를 기다렸다는 듯이..',
    choices: [
      { text: '안으로 들어간다', next: 'church_inside' },
    ],
  },

  church_inside: {
    id: 'church_inside',
    background: require('../assets/backgrounds/church_inside.png'),
    object: null,
    text: '낡은 의자들 사이로 단상 하나가 보인다..\n 저 곳이 연설하는 곳이려나..',
    choices: [
      { text: '단상으로 다가간다', next: 'pulpit_event' },
    ],
  },

  pulpit_event: {
    id: 'pulpit_event',
    background: require('../assets/backgrounds/church_pulpit.png'),
    object: null,
    text: '《지도》\n📎 “이 길이 남쪽으로 향하는 가장 빠른 길이다. 읽은 후 반드시 폐기할 것.”\n\n그 지도에는 남쪽으로 가는 경로와 방법이 상세히 적혀있다.\n 내가 이 지도를 폐기하면..\n다른 사람들은 어떡하지?',
    choices: [
      { text: '지도를 단상 밑의 상자에 숨겨둔다.', next: 'prologue_ending', effect: { morality: +1, evolve: true } },
      { text: '지도를 폐기한다.', next: 'prologue_ending', effect: { morality: -1, evolve: true } },
    ],
  },

  prologue_ending: {
    id: 'prologue_ending',
    background: require('../assets/backgrounds/church_inside.png'),
    object: null,
    text: '이제 남쪽을 향해 출발하자! \n\n[ 프롤로그 종료 ]',
    choices: [],
  },

  bunker_entrance: {
    id: 'bunker_entrance',
    background: require('../assets/backgrounds/bunker_outside.png'),
    object: null,
    text: '…(이 장면은 추후 업데이트 예정입니다)',
    choices: [],
  },
};

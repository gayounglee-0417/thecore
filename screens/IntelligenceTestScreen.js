import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';


const questions = [
  {
    id: 1,
    question: '낯선 천장이다. \n 옆에는 구형 태블릿이 놓여 있다.\n 태블릿에서 음성이 흘러나왔다. \n\n당신은 인간입니까?',
    options: ['맞아', '그 질문에는 대답이 불가합니다.', '%^&*&%^&$%$#@!#%*&^(*&%&^%ㄹㅠㅠM^*%$'],
    answer: '맞아',
  },
  {
    id: 2,
    question: '뭐야 이게..gpt의 농간인가?\n\n다음 문제들을 푸시겠습니까?',
    options: ['응', '아니'],
    answer: '응',
  },
  {
    id: 3,
    type: 'memory',
    question: '화면이 켜지더니\n태블릿에 문제가 업로드 됐다. \n\n 여기서 아빠가 말하는 주소가 어딜까?',
    image: require('../assets/questions/문제1.png'),
    options: ['병원', '집', '성당', '보호소'],
    answer: '집',
  },
  {
    id: 4,
    type: 'input',
    question: '무엇을 의미하는 걸까?',
    image: require('../assets/questions/문제2.jpg'),
    answer: '가위바위보',
  },
  {
    id: 5,
    question: 'gpt는 언제 처음 출시 되었을까요?',
    options: ['2004', '2022', '2019', '2024'],
    answer: '2022',
  },
  {
    id: 6,
    question: '귀하의 행동은 시스템의 명령에 대한 위반으로 간주됩니다. 계속하시겠습니까?',
    sound: require('../assets/sounds/화면전환.mp3'),
    options: ['...', '아니요. 절대 그러지 않겠습니다. 피티피티지피티님..'],
    answer: '...',
  },
  {
    id: 7,
    question: '다시 화면이 원래대로 돌아왔다.\n새로운 파일이 다운로드 되었다는 알림이 떴다.\n파일에는 현 상황의 나에게 가장 필요한 게 적혀 있을 것 같다.\n\n열어볼까?',
    options: ['열어본다.', '느낌이 안 좋다. 안 열래.'],
    answer: '열어본다.',
  },
  {
    id: 8,
    question: '손대기도 전에 파일이 스스로 열렸다. \n 하지만 비밀번호가 걸려있다.\n\n힌트: 현재 파일 직전의 파일명\n파일명: file845.txt\n\n정답은?',
    options: ['file844', '348', 'file846', '844'],
    answer: 'file844',
  },
  {
    id: 9,
    question: '엇 이 글에 뒷장이 있었네? \n\n다미의 는라이간인 직아 면다된 이글이\n믿돼어도 앞로으 가너 마치주는 사들람\n지주해내안 로으원낙 를너 은들그 가라따\n마라탕 개땡기네 그치?',
    options: ['개땡긴다.', '나는 이 글에 적힌 문구를 눈치챘다.'],
    answer: '나는 이 글에 적힌 문구를 눈치챘다.',
  },
  {
    id: 10,
    question: '아무래도 중앙 성당으로 가야 하는 것 같은데..\n\n갈까?',
    options: ['간다', '안가지않지않지않는다.'],
    answer: ['간다', '안가지않지않지않는다.'],
  },
];

export default function IntelligenceTestScreen({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showManual, setShowManual] = useState(false); // ✅ 지침서 표시용
  const [sound, setSound] = useState(null);

  const q = questions[current];
  useEffect(() => {
    let soundInstance;

    const playSound = async () => {
      if (q.sound) {
        try {
          const { sound } = await Audio.Sound.createAsync(q.sound);
          soundInstance = sound;
          setSound(sound);
          await sound.playAsync();
        } catch (e) {
          console.warn('사운드 재생 실패:', e);
        }
      }
    };

    playSound();

 
    return () => {
      if (soundInstance) {
        soundInstance.unloadAsync();
      }
    };
  }, [current]);

  const handleAnswer = (option) => {
    const isCorrect =
      q.type === 'input'
        ? inputAnswer.trim() === q.answer
        : Array.isArray(q.answer)
        ? q.answer.includes(option)
        : option === q.answer;

    if (q.id === 2 && option === '아니') return onFinish(0);
    if (q.id === 6 && option === '아니요. 절대 그러지 않겠습니다. 피티피티지피티님..') return onFinish(0);
    if (isCorrect) setScore((prev) => prev + 1);
    setInputAnswer('');

    if (q.id === 8 && isCorrect) {
      setShowManual(true); //지침서 보여주기
      return;
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      onFinish(score + (isCorrect ? 1 : 0));
    }
  };

  //지침서 화면 표시
  if (showManual) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setShowManual(false);
            setCurrent((prev) => prev + 1); //id=9로 이동
          }}
        >
          <Image
            source={require('../assets/questions/지침서.jpeg')}
            style={{ width: 400, height: 500 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }

  //노이즈 효과
  if (q.id === 6) {
    return (
      <ImageBackground
        source={require('../assets/effects/노이즈.gif')}
        style={styles.noiseBackground}
        resizeMode="cover"
      >
        <View style={styles.noiseOverlay}>
          <Text style={styles.noiseText}>{q.question}</Text>
          <View style={{ alignItems: 'center' }}>
            {q.options.map((opt, idx) => (
              <TouchableOpacity key={idx} style={styles.option} onPress={() => handleAnswer(opt)}>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      {q.id <= 10 && q.question.includes('\n\n') ? (
        <>
          <Text style={styles.playerText}>{q.question.split('\n\n')[0]}</Text>
          <Text style={styles.systemText}>{q.question.split('\n\n')[1]}</Text>
        </>
      ) : (
        <Text style={styles.title}>{q.question}</Text>
      )}

      {q.image && (
        <Image source={q.image} style={{ width: 200, height: 200, marginBottom: 20 }} resizeMode="contain" />
      )}

      <View style={styles.options}>
        {q.type === 'input' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="정답을 입력하세요"
              placeholderTextColor="#aaa"
              value={inputAnswer}
              onChangeText={setInputAnswer}
            />
            <TouchableOpacity style={styles.option} onPress={() => handleAnswer(null)}>
              <Text style={styles.optionText}>제출</Text>
            </TouchableOpacity>
          </>
        ) : (
          q.options.map((opt, idx) => (
            <TouchableOpacity key={idx} style={styles.option} onPress={() => handleAnswer(opt)}>
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#111', padding: 20,
  },
  title: {
    color: '#fff', fontSize: 20, marginBottom: 16, textAlign: 'center',
  },
  playerText: {
    color: '#686868', fontSize: 18, marginBottom: 50, textAlign: 'center', fontFamily: 'Plfont',
  },
  systemText: {
    color: '#fff', fontSize: 20, marginBottom: 30, textAlign: 'center',
  },
  input: {
    width: 260, borderWidth: 1, borderColor: '#666',
    backgroundColor: '#222', color: '#fff',
    padding: 10, marginBottom: 12, borderRadius: 8,
  },
  options: {
    flexDirection: 'column', width: '100%', alignItems: 'center',
  },
  option: {
    backgroundColor: '#333', padding: 12, marginVertical: 6,
    borderRadius: 8, width: 260,
  },
  optionText: {
    color: '#fff', fontSize: 16, textAlign: 'center',
  },
  noiseBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noiseOverlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    borderRadius: 12,
  },
  noiseText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
});

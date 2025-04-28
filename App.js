import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';

import StartScreen from './screens/StartScreen';
import PrologueScreen from './screens/PrologueScreen';
import IntelligenceTestScreen from './screens/IntelligenceTestScreen';
import ResultScreen from './screens/ResultScreen';
import PetSelectScreen from './screens/PetSelectScreen';
import SceneScreen from './screens/SceneScreen';
import PetEvolutionScene from './screens/PetEvolutionScene';
import TrapDeathScreen from './screens/TrapDeathScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BGMPlayer from './data/BgmPlayer';


export default function App() {
        {screen === 'start' && (
          <StartScreen
            onStart={() => {
              resetGame();
              setScreen('prologue');
            }}
            onLoad={loadGame}
          />
        )}
  const [fontsLoaded] = useFonts({
    'Plfont': require('./assets/fonts/온글잎 박다현체.ttf'),
    'DGM' : require('./assets/fonts/DungGeunMo.ttf'),
    'choseon' : require('./assets/fonts/ChosunCentennial.ttf'),
  });

  const [screen, setScreen] = useState('start');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(null);
  const [petId, setPetId] = useState(null);
  const [petStage, setPetStage] = useState(0);
  const [showPetStatus, setShowPetStatus] = useState(false);
  const [iq, setIq] = useState(0);
  const [evolving, setEvolving] = useState(false);
  const [sceneId, setSceneId] = useState('hospital_entrance');

  if (!fontsLoaded) return null;

  const petAssets = {
    leaf: {
      stages: [
        { name: '나뭇잎', image: require('./assets/pets/나뭇잎.gif') },
        { name: '캐터킹', image: require('./assets/pets/캐터킹.gif') },
        { name: '번데기', image: require('./assets/pets/번데기.gif') },
        { name: '나비', image: require('./assets/pets/나비.png') },
      ],
      death: require('./assets/pets/뻔데기.png'),
    },
    egg: {
      stages: [
        { name: '알', image: require('./assets/pets/달걀.gif') },
        { name: '병아리', image: require('./assets/pets/병아리.gif') },
        { name: '병쪽이', image: require('./assets/pets/병쪽이.gif') },
        { name: '닭다리', image: require('./assets/pets/닭다리.png') },
      ],
      death: require('./assets/pets/닭꼬치.png'),
    },
    mystic: {
      stages: [
        { name: '???', image: require('./assets/pets/물음표.gif') },
        { name: '청룡알', image: require('./assets/pets/청룡알.gif') },
        { name: '아기용', image: require('./assets/pets/아기용.gif') },
        { name: '푸앙이', image: require('./assets/pets/푸앙이.png') },
      ],
      death: require('./assets/pets/부앙이.png'),
    },
  };

  const handleFinishTest = (s) => {
    setScore(s);
    setLevel(s >= 7 ? '특별관리대상' : s >= 4 ? '반동분자' : '규율 복종자');
    setScreen('result');
  };

  const handleGoToPet = () => {
    setIq(level === '특별관리대상' ? 2 : level === '반동분자' ? 1 : 0);
    setScreen('pet');
  };

  const handleSelectPet = (selectedPetId) => {
    setPetId(selectedPetId);
    setPetStage(0);
    setSceneId('hospital_entrance');
    setScreen('story');
  };

  const updateStats = (effect) => {
    if (!effect) return;
  
    let newIq = iq;
    let newPetStage = petStage;
  
    // IQ 증가 반영
    if (effect.iq) {
      newIq += effect.iq;
      setIq(newIq);
    }
  
    // evolve 직접 명령 처리
    if (effect.evolve && newPetStage < 3) {
      newPetStage += 1;
    }
  
    // IQ 기반 진화 조건 확인
    if (
      (newIq >= 2 && newPetStage === 0) ||
      (newIq >= 4 && newPetStage === 1) ||
      (newIq >= 6 && newPetStage === 2)
    ) {
      newPetStage += 1;
    }
  
    // 최종 진화 적용
    if (newPetStage !== petStage) {
      setPetStage(newPetStage);
      setEvolving(true);
    }
  };
  
  const saveGame = async () => {
    try {
      await AsyncStorage.setItem('saveData', JSON.stringify({ sceneId, petId, petStage, iq }));
    } catch (e) {
      console.log('저장 실패:', e);
    }
  };

  const loadGame = async () => {
    try {
      const json = await AsyncStorage.getItem('saveData');
      if (json != null) {
        const data = JSON.parse(json);
        setPetId(data.petId);
        setPetStage(data.petStage);
        setIq(data.iq);
        setSceneId(data.sceneId);
        setScreen('story');
      } else {
        alert('저장된 게임이 없습니다.');
      }
    } catch (e) {
      console.log('불러오기 실패:', e);
    }
  };

  const resetGame = async () => {
    try {
      await AsyncStorage.removeItem('saveData');
    } catch (e) {
      console.log('초기화 실패:', e);
    }
    setScore(0);
    setLevel(null);
    setPetId(null);
    setPetStage(0);
    setIq(0);
    setSceneId('hospital_entrance');
    setShowPetStatus(false);
  };

  const currentPet = petId ? petAssets[petId] : null;
  const currentPetStage = currentPet?.stages[petStage];
  const currentPetImage = currentPetStage?.image;
  const currentPetName = currentPetStage?.name;
  const previousPetImage = currentPet?.stages[petStage - 1]?.image ?? currentPetImage;

  return (
    <View style={{ flex: 1 }}>
      <BGMPlayer />
      {evolving && currentPetImage ? (
        <PetEvolutionScene
          petImage={currentPetImage}
          previousImage={previousPetImage}
          onFinish={() => setEvolving(false)}
        />
      ) : (
        <>
          {screen === 'start' && <StartScreen onStart={() => { resetGame(); setScreen('prologue'); }} onLoad={loadGame} />}
          {screen === 'prologue' && <PrologueScreen onFinish={() => setScreen('test')} />}
          {screen === 'test' && <IntelligenceTestScreen onFinish={handleFinishTest} />}
          {screen === 'result' && <ResultScreen score={score} level={level} onNext={handleGoToPet} />}
          {screen === 'pet' && <PetSelectScreen iqLevel={level} onSelect={handleSelectPet} />}
          {screen === 'trap' && <TrapDeathScreen onRestart={() => { resetGame(); setScreen('start'); }} />}

          {screen === 'story' && (
            <>
              <View style={{ position: 'absolute', top: 30, left: 20, zIndex: 10 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Plfont' }}>🧠 지능: {iq}</Text>
              </View>

              <TouchableOpacity
                onPress={() => setShowPetStatus(true)}
                style={{
                  position: 'absolute',
                  top: 30,
                  right: 20,
                  backgroundColor: '#444',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  zIndex: 20,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>펫</Text>
              </TouchableOpacity>

              {showPetStatus && currentPet && (
                <View style={{
                  position: 'absolute',
                  top: 70,
                  right: 20,
                  backgroundColor: '#111',
                  borderRadius: 10,
                  padding: 16,
                  zIndex: 25,
                  alignItems: 'center',
                  width: 160,
                }}>
                  <Image source={currentPetImage} style={{ width: 64, height: 64, marginBottom: 8 }} />
                  <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Plfont' }}>{currentPetName}</Text>
                  <Text style={{ color: '#aaa', fontSize: 14 }}>진화 단계: {petStage + 1}</Text>
                  <TouchableOpacity onPress={() => setShowPetStatus(false)}>
                    <Text style={{ color: '#f88', fontSize: 14 }}>닫기</Text>
                  </TouchableOpacity>
                </View>
              )}

              {sceneId === 'prologue_ending' && (
                <TouchableOpacity
                  onPress={() => setScreen('start')}
                  style={{
                    position: 'absolute',
                    bottom: 300,
                    alignSelf: 'center',
                    backgroundColor: '#333',
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                    zIndex: 50,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>시작 화면으로 돌아가기</Text>
                </TouchableOpacity>
              )}

              <SceneScreen
                sceneId={sceneId}
                onSelect={(nextId) => {
                  if (nextId === 'trap_death') setScreen('trap');
                  else {
                    setSceneId(nextId);
                    saveGame();
                  }
                }}
                playerStats={{ onEffect: updateStats }}
                iq={iq}
              />
            </>
          )}
        </>
      )}
    </View>
  );
}

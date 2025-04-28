import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

let sound; // 전역 변수로 선언해서 App 전체에서 유지

export default function BGMPlayer() {
  useEffect(() => {
    (async () => {
      sound = new Audio.Sound();
      try {
        await sound.loadAsync(require('../assets/sounds/bgm.mp3'));
        await sound.setIsLoopingAsync(true); // 반복 재생
        await sound.setVolumeAsync(0.5); // 볼륨 조절
        await sound.playAsync();
      } catch (e) {
        console.log('🔊 BGM 오류:', e);
      }
    })();

    return () => {
      if (sound) {
        sound.unloadAsync(); // 앱 종료 시 메모리 해제
      }
    };
  }, []);

  return null; // 화면에 아무것도 안 그리는 컴포넌트
}

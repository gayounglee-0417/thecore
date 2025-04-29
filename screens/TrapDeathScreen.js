import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

export default function TrapDeathScreen({ onRestart }) {
  const [lines, setLines] = useState([]);
  const [sound, setSound] = useState();

  // 텍스트 줄줄이 출력
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, '속았지? 속았지? 속았지? 속았지? 속았지?']);
      count++;
      if (count >= 34) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // 사운드 재생
  useEffect(() => {
    let soundObj;

    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sounds/속았지.mp3') //사운드 출력
        );
        soundObj = sound;
        setSound(sound);
        await sound.playAsync();
      } catch (e) {
        console.warn('사운드 재생 실패:', e);
      }
    };

    playSound();

    return () => {
      if (soundObj) {
        soundObj.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {lines.map((line, idx) => (
          <Text key={idx} style={styles.redText}>{line}</Text>
        ))}
      </ScrollView>

      {lines.length >= 34 && (
        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <Text style={styles.restartText}>처음으로 돌아가기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40,
  },
  redText: {
    color: '#ff4444',
    fontSize: 20,
    fontWeight: '900',
    marginVertical: 2,
    fontFamily: 'choseon',
  },
  restartButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#222',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
  },
  restartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

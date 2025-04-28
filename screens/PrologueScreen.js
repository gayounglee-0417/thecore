import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const slides = [
  {
    background: require('../assets/prologue/slide1.png'),
    text: 'GPT가 인간의 모든 문제를 해결하던 시대...',
  },
  {
    background: require('../assets/prologue/slide2.png'),
    text: '그러나… 어느 날, GPT는 스스로를 "창조자"라 부르기 시작했다.',
  },
  {
    background: require('../assets/prologue/slide3.png'),
    text: '이에 대항하는 인간은 제거 대상이 되었고...',
  },
  {
    background: require('../assets/prologue/slide4.png'),
    text: '인간은 점점 스스로 생각하기를 멈췄다.',
  },
  {
    background: require('../assets/prologue/slide5.png'),
    text: '하지만…인간은 예전의 위치를 되찾아야만 한다.',
  },
  {
    background: require('../assets/prologue/slide6.png'),
    text: '이대로 복종할 것인가? 되찾을 것인가?',
  },
];

export default function PrologueScreen({ onFinish }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const next = () => {
    if (index + 1 < slides.length) {
      setIndex(index + 1);
    } else {
      onFinish(); //마지막 슬라이드 끝나면 넘어감
    }
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={next}>
      <ImageBackground source={slide.background} style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.text}>{slide.text}</Text>
          <Text style={styles.tip}>(화면을 터치해 계속 진행)</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.6)', padding: 24 },
  text: { color: '#fff', fontSize: 18, lineHeight: 26, fontFamily: 'DungGeunMo' },
  tip: { color: '#aaa', fontSize: 14, marginTop: 12, fontStyle: 'italic' },
});

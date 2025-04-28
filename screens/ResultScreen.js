import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ResultScreen({ score, level, onNext }) {
  const levelText = {
    '규율복종자': '☑️ 위협 등급: 없음\n📁 상태: 순응적',
  '반동분자': '⚠️ 위협 등급: 중간\n🧠 상태: 판단 능력 있음',
  '특별관리대상': '🚨 위협 등급: 치명적\n🔒 상태: 통제 불가 / 격리 필요',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>지능 테스트 결과</Text>
      <Text style={styles.score}>총 점수: {score} / 10</Text>
      <Text style={styles.level}>등급: {level}</Text>
      <Text style={styles.description}>{levelText[level]}</Text>

      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>펫 선택하러 가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', padding: 24 },
  title: { fontSize: 24, color: '#fff', marginBottom: 16 },
  score: { fontSize: 18, color: '#ccc', marginBottom: 8 },
  level: { fontSize: 20, color: '#f99', marginBottom: 12 },
  description: { fontSize: 16, color: '#bbb', textAlign: 'center', marginBottom: 24 },
  button: { backgroundColor: '#333', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16 },
});
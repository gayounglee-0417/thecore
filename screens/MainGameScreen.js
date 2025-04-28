import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const petAssets = {
  leaf: {
    name: '나뭇잎',
    image: require('../assets/pets/나뭇잎.gif'),
    ability: '회복 + 자연 친화력',
  },
  egg: {
    name: '알',
    image: require('../assets/pets/달걀.gif'),
    ability: '기초 체력 + 생존력',
  },
  mystic: {
    name: '???',
    image: require('../assets/pets/물음표.gif'),
    ability: '미지의 능력 (게임 중 해금)',
  },
};

export default function MainGameScreen({ route }) {
  const { petId, iqLevel } = route.params;
  const [pet, setPet] = useState(null);

  useEffect(() => {
    if (petId && petAssets[petId]) {
      setPet(petAssets[petId]);
    }
  }, [petId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌍 세계의 중앙 - 생존 구역 🌍</Text>
      <Text style={styles.iqLevel}>지능 등급: {iqLevel || '정보 없음'}</Text>

      {pet ? (
        <View style={styles.petBox}>
          <Image source={pet.image} style={styles.petImage} />
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petAbility}>{pet.ability}</Text>
        </View>
      ) : (
        <Text style={styles.alone}>당신은 홀로 살아갑니다...</Text>
      )}

      {/* 이후 탐험, 이벤트 버튼 들어올 자리 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#111', alignItems: 'center' },
  header: { fontSize: 20, color: '#fff', marginBottom: 10 },
  iqLevel: { fontSize: 16, color: '#aaa', marginBottom: 20 },
  petBox: { alignItems: 'center' },
  petImage: { width: 80, height: 80, marginBottom: 8 },
  petName: { fontSize: 18, color: '#f0f' },
  petAbility: { fontSize: 14, color: '#ccc' },
  alone: { fontSize: 16, color: '#888', fontStyle: 'italic' },
});

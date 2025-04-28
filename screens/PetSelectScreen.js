import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const pets = [
  {
    id: 'leaf',
    name: '나뭇잎',
    description: '위에서 웬 벌레 알이 통통 튀고 있다!',
    image: require('../assets/pets/나뭇잎.gif'),
  },
  {
    id: 'egg',
    name: '알',
    description: '맛있어 보인다....',
    image: require('../assets/pets/달걀.gif'),
  },
  {
    id: 'mystic',
    name: '???',
    description: '왠지..신비해보인다!!',
    image: require('../assets/pets/물음표.gif'),
  },
];

export default function PetSelectScreen({ iqLevel, onSelect }) {
  const handleSelect = (petId) => {
    onSelect(petId);
  };

  const handleIgnore = () => {
    onSelect(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 친구를 선택하시겠어요?</Text>
      {pets.map((pet) => (
        <TouchableOpacity key={pet.id} style={styles.petCard} onPress={() => handleSelect(pet.id)}>
          <Image source={pet.image} style={styles.petImage} />
          <View>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petDesc}>{pet.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.ignoreButton} onPress={handleIgnore}>
        <Text style={styles.ignoreText}>난 가축 따위 필요치 않다. 혼자 이동하겠다!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20, justifyContent : 'center' },
  title: { fontSize: 22, color: '#fff', marginBottom: 20, textAlign: 'center' },
  petCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', padding: 12, marginBottom: 12, borderRadius: 8 },
  petImage: { width: 64, height: 64, marginRight: 12 },
  petName: { fontSize: 18, color: '#f0f' },
  petDesc: { fontSize: 14, color: '#ccc' },
  ignoreButton: { marginTop: 20, alignItems: 'center' },
  ignoreText: { color: '#888', fontSize: 16, fontStyle: 'italic' },
});

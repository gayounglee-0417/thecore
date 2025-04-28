import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function StartScreen({ onStart, onLoad }) {
  return (
    <ImageBackground
      source={require('../assets/backgrounds/더코어.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={onLoad}>
          <Text style={styles.buttonText}>불러오기</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', //투명도
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop:500,
    padding: 20,
  },
  
  button: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#888',
  },
  button2: {
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'DGM', // 영어 폰트
  },
});

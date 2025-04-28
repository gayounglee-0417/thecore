import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';
import { Audio } from 'expo-av';

export default function PetEvolutionScene({ petImage, previousImage, onFinish }) {
  const scale = new Animated.Value(1);
  const opacity = new Animated.Value(1);
  const sparkle = new Animated.Value(0);
  const [showNewForm, setShowNewForm] = useState(false);

  //사운드 재생
  useEffect(() => {
    let sound;

    const playSound = async () => {
      try {
        sound = new Audio.Sound();
        await sound.loadAsync(require('../assets/effects/진화.wav'));
        await sound.playAsync();
      } catch (e) {
        console.warn('사운드 재생 오류:', e);
      }
    };

    playSound();

    Animated.sequence([
      Animated.timing(scale, { toValue: 1.5, duration: 700, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setShowNewForm(true);

      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.0, duration: 500, useNativeDriver: true }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(sparkle, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(sparkle, { toValue: 0, duration: 300, useNativeDriver: true }),
          ]),
          { iterations: 3 }
        ),
      ]).start(() => {
        setTimeout(() => {
          if (sound) sound.unloadAsync();
          onFinish();
        }, 1000);
      });
    });

    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const sparkleStyle = {
    opacity: sparkle,
    position: 'absolute',
    width: 120,
    height: 120,
    top: '40%',
    left: '50%',
    marginLeft: -60,
    zIndex: 5,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>당신의 펫이 진화하고 있습니다...</Text>
      <Animated.Image
        source={showNewForm ? petImage : previousImage}
        style={[styles.image, { transform: [{ scale }], opacity }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require('../assets/effects/sparkle.png')}
        style={sparkleStyle}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#fff', marginBottom: 20 },
  image: { width: 180, height: 180, zIndex: 3 },
});

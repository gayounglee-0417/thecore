import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { sceneData } from '../data/sceneData';

export default function SceneScreen({ sceneId, onSelect, playerStats, iq }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sound, setSound] = useState(null);
  const scene = sceneData[sceneId];

  if (!scene) return <Text style={styles.error}>존재하지 않는 씬입니다.</Text>;

  useEffect(() => {
    let soundObject;

    const playSound = async () => {
      if (scene.sound) {
        try {
          soundObject = new Audio.Sound();
          await soundObject.loadAsync(scene.sound);
          await soundObject.playAsync();
          setSound(soundObject);
        } catch (e) {
          console.warn('사운드 재생 실패:', e);
        }
      }
    };

    playSound();

    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, [sceneId]);

  const handleChoice = (choice) => {
    if (choice.effect && playerStats?.onEffect) {
      playerStats.onEffect(choice.effect);
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      onSelect(choice.next);
    }, 100);
  };

  if (isTransitioning) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>다음 장면 불러오는 중...</Text>
      </View>
    );
  }

  const textToShow = typeof scene.dynamicText === 'function' ? scene.dynamicText(iq) : scene.text;
  const choicesToShow = typeof scene.dynamicChoices === 'function' ? scene.dynamicChoices(iq) : scene.choices;

  return (
    <ImageBackground
      source={scene.background}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{ backgroundColor: '#000' }}
    >
      {scene.object && (
        <Image
          key={scene.id + '_object'}
          source={scene.object}
          style={[styles.object, scene.objectStyle]}
          resizeMode="contain"
        />
      )}

      <View style={styles.overlay}>
        <Text style={styles.text}>{textToShow}</Text>

        <View style={styles.choices}>
          {choicesToShow.map((choice, idx) => (
            <TouchableOpacity key={idx} style={styles.choiceButton} onPress={() => handleChoice(choice)}>
              <Text style={styles.choiceText}>{choice.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000',
  },
  object: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    width: 100,
    height: 100,
    zIndex: 2,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 24,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 26,
    fontFamily: 'DGM',
    textAlign: 'center',
  },
  choices: {
    flexDirection: 'column',
    gap: 12,
  },
  choiceButton: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    borderColor: '#555',
    borderWidth: 1,
  },
  choiceText: {
    color: '#686868',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Plfont',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    opacity: 0.8,
  },
});


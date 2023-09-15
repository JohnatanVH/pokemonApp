import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParams } from '../navigator/Tab1';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';
import { useCapitalize } from '../hooks/useCapitalize';


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { simplePokemon, color, textColor } = route.params;
  const {id, name, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();

  const {isLoading, pokemon} = usePokemon(id);  

  return (
    <View style={{flex: 1}}>
      {/* Header Container */}
      <View style={{
        ...styles.headerContainer,
        backgroundColor: color
      }}>
        {/* Estilo Botón back */}
        <View
          style={{
            ...styles.backButton,
            top: top + 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.pop()}
          >
            <Icon
              name='arrow-back-outline'
              color='white'
              size={35}
            />
          </TouchableOpacity>
        </View>
        {/* ---------------------------------- */}
        {/* Nombre Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 50,
            color: textColor
          }}
        >
          {useCapitalize(name) + '\n'}#{id}
        </Text>
        {/* Pokebola Blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />
        {/* Imagen Pokemon */}
        <FadeInImage
          uri={picture}
          style={styles.pokemonImage}
        />

      </View>
      {/* Detalles y Loading */}
      {
        isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              color={ color }
              size={ 50 }
            />
          </View>

        )
        : <PokemonDetails pokemon={pokemon}/>

      }

    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
    width: 40,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 15
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
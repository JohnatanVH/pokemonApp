import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAnimation } from '../hooks/useAnimation';
import { useDarkLight } from '../hooks/useDarkLight';
import { useCapitalize } from '../hooks/useCapitalize';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setbgColor] = useState('grey');
    const isMounted = useRef(true); //Este es para evitar el error de que se cambie el estado en un componente que no esté montado

    const navigation = useNavigation() as NavigationProp<any, any>;

    const {opacity, fadeIn} = useAnimation();
    const [elevation, setElevation] = useState(0)

    const [textColor, setTextColor] = useState('white');

    useEffect(() => {
        ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
            .then(colors => {

                if (!isMounted.current) return; //Esto me protege cuando el componente esté desmontado y quiera aplicar un tipo de sustitución de esos

                if (colors.platform === 'android') {
                    setbgColor(colors.dominant || 'grey');
                } else if (colors.platform === 'ios') {
                    setbgColor(colors.background || 'grey');
                }
            }).finally(() => {
                fadeIn(500, () => {
                    setElevation(9);
                });
            });

        

        return () => {  //Esta función de retorno del useEffect se dispara cuando el componente se va a desmontar
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        setTextColor((useDarkLight(bgColor)) ? 'white' : 'black');
    }, [bgColor])

    return (
            <Animated.View
                style={{
                    opacity
                }}
            >
               <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('PokemonScreen', {
                    simplePokemon: pokemon,
                    color: bgColor,
                    textColor
                })
                }
            >
                <Animated.View style={{
                    ...stylesPoke.cardContainer,
                    width: windowWidth * 0.4,
                    backgroundColor: bgColor,
                    elevation
                }}>
                    {/* Nombre del pokemon y ID */}
                    <View>
                        <Text style={{
                                ...stylesPoke.name,
                                color: textColor
                            }}>
                            {useCapitalize(pokemon.name)}
                            {'\n#' + pokemon.id}
                        </Text>
                    </View>

                    <View style={stylesPoke.pokebolaContainer}>
                        <Image
                            source={require('../assets/pokebola-blanca.png')}
                            style={stylesPoke.pokebola}
                        />
                    </View>

                    <FadeInImage
                        uri={pokemon.picture}
                        style={stylesPoke.pokemonImage}
                    />

                </Animated.View>
            </TouchableOpacity>
            </Animated.View>

    )
}

const stylesPoke = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -25
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    },
});
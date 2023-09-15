import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Platform, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useEffect } from 'react';

interface Props {
    onDebounce: (value: string) => void,
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({style, onDebounce}:Props) => {

    const [textValue, setTextValue] = useState('');

    const devouncedValue = useDebouncedValue(textValue);

    useEffect(() => {
      onDebounce(devouncedValue);
    }, [devouncedValue])
    

    return (
        <View style={{
             ...styles.container,
             ...style as any,
            }}>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder='Buscar Pokemón'
                    style={{
                        ...styles.textInput,
                        top: (Platform.OS === 'ios') ? 0 : 2,
                    }}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={setTextValue}
                />
                <Icon
                    name='search-outline'
                    color='grey'
                    size={30}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
    },
});
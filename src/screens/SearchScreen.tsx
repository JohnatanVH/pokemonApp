import React, { useEffect, useState } from 'react';
import { Platform, View, Text, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SearchInput } from '../components/SearchInput';
import { styles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();

  const [pokemonFiltered, setpokemonFiltered] = useState<SimplePokemon[]>([])

  const [term, setTerm] = useState(''); 

  useEffect(() => {

    if(term.length === 0){
      return setpokemonFiltered([]);
    }

    if( isNaN( Number(term) ) ){
      setpokemonFiltered(
        simplePokemonList.filter(
          (poke) => poke.name.toLocaleLowerCase()
            .includes(  term.toLocaleLowerCase()  )
        )
      );
    }else{
      // AquÍ se usa un Find porque busca el primero que encuentre
      const pokemonById = simplePokemonList.find( (poke) => poke.id === term );
      setpokemonFiltered(
        ( pokemonById ) ? [pokemonById] : []
      );
    }



  }, [term])
  

  if (isFetching) {
    return (
      <Loading/>
    )
  }

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 20
    }}>
      <SearchInput
        onDebounce={ (value) => setTerm(value) }
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: (Platform.OS === 'ios') ? top : top + 30
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}

        //Header
        ListHeaderComponent={(
          <Text style={{
            ...styles.title,
            ...styles.globalMargin,
            paddingBottom: 10,
            marginTop: (Platform.OS === 'ios') ? top + 60: top + 80
          }}
          >{term}</Text>
        )}
        renderItem={({ item }) => (<PokemonCard pokemon={item} />)}
        ListFooterComponent={() => <View style={{height: 60}}/>}
      />
    </View>
  )
}

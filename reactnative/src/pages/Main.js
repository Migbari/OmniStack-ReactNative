import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
// requestPermissionsAsync - Solicita permissão de localização p/ o usuário
// getCurrentPositionAsync - Pega a localização do usuário

import { MaterialIcons } from '@expo/vector-icons'; // Para importar icone GPS

// Importa API para busca dos usuários
import api from '../services/api';

// Instalamos o módulo de geolocalização do expo > expo install expo-location
// Obs. Para utilizar na função loadInitialPosition
function Main({ navigation }) {
    // Cria estado para armazenar devs
    const [devs, setDevs] = useState([]);
    // Cria estado e armazenar info preenchidas por loadInitialPosition
    const [currentRegion, setCurrentRegion] = useState(null);

    const [techs, setTechs] = useState('')

    useEffect(() => {
        // Função que carrega a posição inicial no mapa
        async function loadInitialPosition() {

            // Informa se o acesso a local foi permitido    
            const { granted } = await requestPermissionsAsync();

            // Se permição okey, getCurrentPosition↓
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                // Desentruturação do obj coords buscando 
                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04, // calculo para ferramenta zoom
                    longitudeDelta: 0.04,
                })

            }

        }
        // Chamamos a função logo abaixo de sua declaração. Isso faz com que 
        // ela seja executada logo após a montagem do useEffect();
        loadInitialPosition();
    }, []);

    // Cria método para carregar os devs da API / Pega localização atual no mapa
    async function loadDevs() {
        // In currentRegion que é o estado que grava a local atual do usuário
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs,
            }
        });
        // ↑ ↑ ↑ 
        setDevs(response.data.devs);
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }


    // Não renderiza se for null. 
    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={styles.map}>
                {devs.map(dev => (
                  <Marker
                  key={dev._id}
                  coordinate={{
                      longitude: dev.location.coordinates[0],
                      latitude: dev.location.coordinates[1],
                  }}>
                  <Image style={styles.avatar} 
                  source={{ uri: dev.avatar_url }} />
                 
                  {/* callout - semelhante a div, onPress - semelhante a onClick */}
                  <Callout onPress={() => {
                      // Passa a propriedade navigation como parametro da função Main - Usa método navigate e passa o nome da proxima tela
                      // Passou usuario como parametro e envia para tela Perfil
                      navigation.navigate('Profile', { github_username: dev.github_username })
                  }}>
                      <View style={styles.callout}>
                          <Text style={styles.devName}>{dev.name}</Text>
                          <Text style={styles.devBio}>{dev.bio}</Text>
                          <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                      </View>
                  </Callout>
              </Marker>  
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})

export default Main;
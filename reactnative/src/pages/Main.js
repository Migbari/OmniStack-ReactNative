import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput,  TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
// requestPermissionsAsync - Solicita permissão de localização p/ o usuário
// getCurrentPositionAsync - Pega a localização do usuário

import {MaterialIcons} from '@expo/vector-icons'; // Para importar icone GPS


// Instalamos o módulo de geolocalização do expo > expo install expo-location
// Obs. Para utilizar na função loadInitialPosition
function Main( {navigation} ) {

    // Cria estado e armazenar info preenchidas por loadInitialPosition
    const [currentRegion, setCurrentRegion] = useState(null);
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
    // Não renderiza se for null. 
    if (!currentRegion) {
        return null;
    }

    return (
        <>
        // Passa uma propriedade para usar currentRegion dentro do mapa 
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -23.4811605, longitude: -46.7198751 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/55153496?s=400&u=679522c986909b2cfbfcca319209fab944b746d7&v=4' }} />
                {/* callout - semelhante a div, onPress - semelhante a onClick */}
                <Callout onPress={() => {
                // Passa a propriedade navigation como parametro da função Main - Usa método navigate e passa o nome da proxima tela
                // Passou usuario como parametro e envia para tela Perfil
                 navigation.navigate('Profile', { github_username: 'Migbari' })
                     
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Miguel Batista</Text>
                        <Text style={styles.devBio}>May your faith in life be greater than your fears!</Text>
                        <Text style={styles.devTechs}>ReactJS, JavaScript, NodeJS</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
        <View style={styles.searchForm}>
            <TextInput 
            style={styles.searchInput}
            placeholder="Buscar devs por techs..."
            placeholderTextColor="#999"
            autoCapitalize="words" 
            autoCorrect={false} 
            />
            {/* 4º Palavra/words inicia cm maiuscula -- 5º Auto correção false/off */}

            <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
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
})

export default Main;
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { Marker } from 'react-native-maps';
// requestPermissionsAsync - Solicita permissão de localização p/ o usuário
// getCurrentPositionAsync - Pega a localização do usuário


// Instalamos o módulo de geolocalização do expo > expo install expo-location
// Obs. Para utilizar na função loadInitialPosit
function Main() {

    // Cria estado e armazenar info preenchidas por loadInitialPosit
    const [currentRegion, setCurrentRegion] = useState(null);
    useEffect(() => {
        // Função que carrega a posição inicial no mapa
        async function loadInitialPosit() {

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
        loadInitialPosit();
    }, [])
    // Não renderiza se for null. 
    if (!currentRegion) {
        return null;
    }

    // Passa uma propriedade ↓ para usar ↓ dentro do mapa 
    return (

        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -27.211164, longitude: -49.6374491 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/55153496?s=400&u=679522c986909b2cfbfcca319209fab944b746d7&v=4' }} />
                <Callout>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Miguel Batista</Text>
                        <Text style={styles.devBio}>May your faith in life be greater than your fears!</Text>
                        <Text style={styles.devTechs}>ReactJS, JavaScript, NodeJS</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 10,
        borderWidth: 4,
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
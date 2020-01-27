import React from 'react';
import { WebView } from 'react-native-webview'; // WebView - recurso que permite a navegação o Perfil site GitBub

function Profile ({navigation}){
    // Assim como no Main, porém aqui utiliza getParam para pegar github_username
    const githubUsername = navigation.getParam('github_username')

    return <WebView style={{ flex: 1 }} source={{uri: `https://github.com/${githubUsername}`}} />
}

export default Profile;
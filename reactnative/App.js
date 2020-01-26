import React from 'react';
import { StatusBar } from 'react-native'; // Importamos o component

import Routes from './src/routes';
export default function App() {
  return (
    <>
    {/* light-content - propriedade que define conteudo status bar branco*/}
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
    <Routes/>
    </>
  );
}






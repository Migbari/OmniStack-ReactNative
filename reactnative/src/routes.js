import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

// Precisa ficar por fora de toda a navegação da aplicação / Necessário inserir uma única vez
const Routes = createAppContainer(
    // Passamos nossas rotas da navegação pela função createStackNavigator
    createStackNavigator({
        // Transforma o componente em um objeto
        Main: {
            screen: Main, // Indica qual componente será renderizado
            navigationOptions: { // opções especificas do component
                title: 'DevRadar' // Crtl + Espaço mostra mais opções
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        }
    }, { // Passamos como segundo parametro da função createStackNavigator
        // As mesmas navigationOptions utilizadas anteriormente, porém por ser default será aplicada em todas as telas
        defaultNavigationOptions:{ 
            headerTintColor: '#FFF',    
            headerStyle:{
                backgroundColor: '#7D40E7',
            }
        }
    })
);

export default Routes;
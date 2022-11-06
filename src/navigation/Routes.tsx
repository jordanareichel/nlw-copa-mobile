import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { New } from '@screens/New';
import { Pools } from '@screens/Pools';
import {PlusCircle, SoccerBall} from 'phosphor-react-native';
import {Box, useTheme} from 'native-base';
import {Platform} from 'react-native';
import { Find } from '@screens/Find';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '@screens/SignIn';
import { useAuth } from '../hooks/useAuth';
import { Details } from '@screens/Details';

const {Navigator, Screen} = createBottomTabNavigator();

const AppStack = () => {
  const {colors, sizes} = useTheme();

  const size = sizes[6];
	return (
		<Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.yellow[500], 
      tabBarInactiveTintColor: colors.gray[300],
      tabBarLabelPosition: 'beside-icon',
      tabBarStyle: {
        position: 'absolute',
        height: 87,
        borderTopWidth: 0,
        backgroundColor: colors.gray[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? '-10' : 0,
      }
    }}>
      <Screen
        name='new'
        component={New}
        options={{
          tabBarIcon: ({color}) => <PlusCircle color={color} size={size}/>,
          tabBarLabel: 'Novo Bolão', 
        }}
      />
      <Screen
        name='pools'
        component={Pools}
        options={{
          tabBarIcon: ({color}) => <SoccerBall color={color} size={size}/>,
          tabBarLabel: 'Meus Bolões',  
        }}
      />
      <Screen
        name='find'
        component={Find}
        options={{tabBarButton: () => null}}
      />
       <Screen
        name='details'
        component={Details}
        options={{tabBarButton: () => null}}
      />
    </Navigator>
	);
};

const Routes = () => {
  const {user} = useAuth();

  return (
    <Box flex={1} bgColor="gray.900">
        <NavigationContainer>
        {user.name ? (
          <AppStack />
        ): (
          <SignIn />
        ) 
        }
      </NavigationContainer>
    </Box>
  )
}

export default Routes;
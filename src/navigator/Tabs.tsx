import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Tab1 } from './Tab1';
import Icon from 'react-native-vector-icons/Ionicons';

import { Tab2Screen } from './Tab2';

import SplashScreen from 'react-native-splash-screen'

const Tab = createBottomTabNavigator();


export const Tabs = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, [])
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5856D6',
                tabBarLabelStyle: {
                    marginBottom: (Platform.OS === 'ios' ? 0 : 10)
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios' ? 80 : 60),
                }
            }}

        >
            <Tab.Screen
                name="Navigator"
                component={Tab1}
                options={{
                    tabBarLabel: 'Listado',
                    tabBarIcon: (({ color }) => (
                        <Icon
                            color={color}
                            size={25}
                            name='list-outline'
                        />
                    ))
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={Tab2Screen}
                options={{
                    tabBarLabel: 'Búsqueda',
                    tabBarIcon: (({ color }) => (
                        <Icon
                            color={color}
                            size={25}
                            name='search-outline'
                        />
                    ))
                }}
            />
        </Tab.Navigator>
    );
}
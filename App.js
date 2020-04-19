import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/FontAwesome'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import {store, persistor} from './redux/store'

import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen'
import DetailsScreen from './screens/DetailsScreen'
import FavoritesScreen from './screens/FavoritesScreen'

const SearchNavigator = createStackNavigator({
    SearchScreen: SearchScreen,
    ResultsScreen: ResultsScreen,
    DetailsScreen: DetailsScreen,
  }, 
  {
    initialRouteName: 'SearchScreen',
    navigationOptions: {
      headerTintColor: '#40e0d0'
    }
  }
)
const Favorites = createStackNavigator({
    FavoritesScreen: FavoritesScreen
  },
  {
    navigationOptions: {
      headerTintColor: '#40e0d0'
    }
  }
)
const AppNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({tintcolor}) => (
        <IonIcons name='search' size={25} color={tintcolor}/>
      ),
    }
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({tintcolor}) => (
        <IonIcons name='star' size={25} color={tintcolor} />
      )
    }
  }
})

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator navigation={this.props.navigation}/>
        </PersistGate>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

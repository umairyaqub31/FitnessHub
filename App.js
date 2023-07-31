import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from '@navigation';
import {Provider as PaperProvider} from 'react-native-paper';

import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import reducers from '@redux';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const persistConfig = {
  key: 'fitnessHub',
  blacklist: ['navigation'],
  storage: AsyncStorage,
};

const store = compose(applyMiddleware(thunk))(createStore)(
  persistReducer(persistConfig, reducers),
);

const persistor = persistStore(store);

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={{flex: 1}}>
              {/* <Image
                source={require('@images/splash.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              /> */}
            </View>
          }
          persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

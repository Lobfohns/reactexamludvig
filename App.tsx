import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import Navigation from './components/Navigation';
import chatReducer from './store/reducers/chat.reducer';
import messageReducer from './store/reducers/message.reducer';
import userReducer from './store/reducers/user.reducer';
import { LogBox } from 'react-native';
//These 2 lines makes the yellow error for setting a timer go away :D, just ignores it(maybe not smart no clue)
LogBox.ignoreLogs(['Setting a timer']);


const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  message: messageReducer
});
export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));




export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}


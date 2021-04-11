import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'video-react/dist/video-react.css';
import { BrowserRouter } from 'react-router-dom';
import { reduxFirestore, getFirestore,createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider,getFirebase} from 'react-redux-firebase';
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './Store/reducers/rootReducer';
import fbConfig from './config/fbConfig'
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(fbConfig)
  )
);

const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false
}

const newfbConfig = Object.assign(fbConfig,profileSpecificProps);



const rrfProps = {
  firebase,
  config: newfbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};


function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return (
    <React.Fragment>
  </React.Fragment>
  );
  return children
}



ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
       <BrowserRouter>
        <App />
       </BrowserRouter>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
document.getElementById('root')
);


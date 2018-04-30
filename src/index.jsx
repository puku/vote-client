import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';


const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
    store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <div>
    <Route exact path="/" component={VotingContainer}/>
    <Route path="/results" component={ResultsContainer}/>
</div>;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>{routes}</BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

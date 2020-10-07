import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import loadUser from './components/auth/loadUser';

// 이 시점에서 불러야 딜레이가 적다.
loadUser();
ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { teal, yellow } from '@mui/material/colors';

import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {BrowserRouter} from "react-router-dom";

const theme = createTheme( {
    palette:{
        primary: teal,
        secondary: yellow,
        
    }
})

ReactDOM.render(
<ThemeProvider theme={theme}>
    <Provider store={store}>
        <BrowserRouter>
            <AppWithRedux />
        </BrowserRouter>
    </Provider>

</ThemeProvider>
,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

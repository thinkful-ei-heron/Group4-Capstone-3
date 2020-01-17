import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {UserProvider} from './contexts/UserContext';
import {JournalProvider} from './contexts/JournalContext';
import {MapProvider} from './contexts/MapContext';
import {ParallaxProvider} from 'react-scroll-parallax';

ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <JournalProvider>
                <MapProvider>
                    <ParallaxProvider>
                        <App/>
                    </ParallaxProvider>
                </MapProvider>
            </JournalProvider>
        </UserProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

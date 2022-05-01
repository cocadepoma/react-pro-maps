/* eslint import/no-webpack-loader-syntax: off */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

//@ts-ignore
import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1Ijoic295bDN5M25kNCIsImEiOiJjbDJtdmlzdmExdWdkM2pwOWI3NjU5ankxIn0.ojps9db4pZmwZhUgLe8jjg';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error("Geolocation is not supported by your browser");
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);


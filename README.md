### Endomondo-like App

Based on the Endomondo concept, a training application that records geographical location on a map.

# They asked me to buy premium, I wrote my own!

## Check it out!

[Personal tracker](https://dariuszsikorra.github.io/endomondo-like-app/) and dig into code!
The application is designed for mobile devices, I decided that hardly anyone will want to run with a laptop.

## About

The application aims to track the location using the navigator.geolocation interface and remember the obtained results. Based on the results, the application draws a polyline that reflects the path travelled. The map used in the application is based on the Google Maps API.
<br/>
The application also determines the speed of the device and the time for which the measurement is performed.

## Libriaries and dependencies:

-[google-maps-react](https://github.com/fullstackreact/google-maps-react) for lazy-load Google Maps dependencies, <br/>
-[Typescript](https://www.typescriptlang.org/) to increase consistency of code, and get nice code hints, <br/>
-[Material-Ui](https://material-ui.com/) for a nice look at a low cost, <br/>
-React Hooks, to maintain global state, set intervals and maintain this juicy content! <br/>

## Add in the future:

-Web bundles, to work in offline environment,
-Save data and represent it in charts form,
-Make google maps api interface more friendly (change marker and maybe line color),
-Implement altitude checker...

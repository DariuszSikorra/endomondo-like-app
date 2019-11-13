(this["webpackJsonpendomondo-like-app"]=this["webpackJsonpendomondo-like-app"]||[]).push([[0],{38:function(e,t,n){e.exports=n(61)},43:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),i=n.n(o),c=(n(43),n(8)),l=n(25);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var p=function(e,t){switch(t.type){case"CURRENT_POSITION":return s({},e,{currentPosition:t.payload});case"MAP_POSITIONS":var n=e.mappedPositions.concat(t.payload);return s({},e,{mappedPositions:n});case"COUNTING_STARTED":return s({},e,{countingStarted:t.payload});case"COUNT":return s({},e,{runningTime:t.payload});case"MAP_DISTANCE":return s({},e,{distance:e.distance+t.payload});case"RESET":return s({},e,{countingStarted:!1,runningTime:0,mappedPositions:[],distance:0});default:return e}},m=a.a.createContext(void 0),d=a.a.createContext(void 0),g=function(){var e=a.a.useContext(m);if(void 0===e)throw new Error("useAppState must be used within AppProvider");return e},f=n(79);var y=n(85),h=n(82),v=n(83),O=function(){var e=g(),t=function(){var e=a.a.useContext(d);if(void 0===e)throw new Error("useDispatchState must be used within AppProvider");return e}(),n=Date.now()-e.runningTime;!function(e,t,n){var a=Object(r.useRef)((function(){}));Object(r.useEffect)((function(){a.current=e}),[e]),Object(r.useEffect)((function(){if(n){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}}),[t,n])}((function(){t({type:"COUNT",payload:Date.now()-n});var r={lat:e.currentPosition.latitude,lng:e.currentPosition.longitude};if(t({type:"MAP_POSITIONS",payload:r}),e.mappedPositions.length>1){var a=e.mappedPositions[e.mappedPositions.length-2],o=e.mappedPositions[e.mappedPositions.length-1];return i(a,o)}return i({lat:0,lng:0},{lat:0,lng:0})}),1e3,e.countingStarted),Object(r.useEffect)((function(){var e=0;if(navigator.geolocation){e=navigator.geolocation.watchPosition((function(e){var n=e.coords;t({type:"CURRENT_POSITION",payload:n})}),(function(e){console.warn("ERROR(".concat(e.code,"): ").concat(e.message))}),{enableHighAccuracy:!0,timeout:2e3,maximumAge:1e3})}else console.log("Something get wrong, geolocation is disabled, or your browser is not supporting it");return function(){return navigator.geolocation.clearWatch(e)}}),[t]);var o=a.a.createElement("div",null,a.a.createElement("span",null,Math.floor(e.runningTime/1e3/60<<0)),":",a.a.createElement("span",null,Math.floor(e.runningTime/1e3%60)<10&&0,Math.floor(e.runningTime/1e3%60))),i=function(e,n){var r=e.lat,a=e.lng,o=n.lat,i=n.lng,c=p(o-r),l=p(i-a),u=Math.sin(c/2)*Math.sin(c/2)+Math.cos(p(r))*Math.cos(p(o))*Math.sin(l/2)*Math.sin(l/2),s=2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u));function p(e){return e*(Math.PI/180)}return t({type:"MAP_DISTANCE",payload:6371*s})};return a.a.createElement("div",{className:"mapContainer",style:{textAlign:"center",background:"lightgray"}},a.a.createElement(f.a,{maxWidth:"sm"},a.a.createElement(h.a,{variant:"h6",component:"h4"},"Your coordinates provided by geolocation:",a.a.createElement("ul",null,a.a.createElement("li",null,"Latitude: ",e.currentPosition.latitude),a.a.createElement("li",null,"Longitude: ",e.currentPosition.longitude),a.a.createElement("li",null,"Accuracy: ~",Math.floor(e.currentPosition.accuracy),"m"),a.a.createElement("li",null,"Current speed:"," ",e.currentPosition.speed?Math.floor(1e3*e.currentPosition.speed/60)+"km/h":"-"),a.a.createElement("li",null,"Current distance: ",Math.floor(1e3*e.distance),"m"))," "),a.a.createElement(h.a,{color:"primary",variant:"h5",component:"h3"},o),a.a.createElement(v.a,{color:"primary",variant:"contained"},a.a.createElement(y.a,{onClick:function(){t({type:"COUNTING_STARTED",payload:!e.countingStarted})}},e.countingStarted?"Stop":"Start"),a.a.createElement(y.a,{color:"primary",variant:"contained",onClick:function(){return t({type:"RESET"})}},"Reset"))))},P=n(21),E=function(){var e=g();return a.a.createElement("div",{className:"mapWrapper"},a.a.createElement(P.Map,{google:window.google,style:{width:"100%",height:"95%"},className:"map",zoom:14,initialCenter:{lat:e.currentPosition.latitude,lng:e.currentPosition.longitude}},a.a.createElement(P.Marker,{title:"The marker`s title will appear as a tooltip.",name:"SOMA",position:{lat:e.currentPosition.latitude,lng:e.currentPosition.longitude}}),a.a.createElement(P.Polyline,{path:e.mappedPositions,strokeColor:"#0000FF",strokeOpacity:.8,strokeWeight:3})))},b=Object(P.GoogleApiWrapper)({apiKey:"AIzaSyAGnzKbqsq9u1BjIswxPr6p5SveDtx7H20"})((function(){return a.a.createElement("div",{className:"mapContainer"},a.a.createElement(E,null))})),w=n(84);function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement((function(e){var t=e.children,n=a.a.useReducer(p,{currentPosition:{},countingStarted:!1,runningTime:0,mappedPositions:[],distance:0}),r=Object(l.a)(n,2),o=r[0],i=r[1];return a.a.createElement(m.Provider,{value:o},a.a.createElement(d.Provider,{value:i},t))}),null,a.a.createElement((function(){var e=a.a.useState({bottom:!0}),t=Object(l.a)(e,2),n=t[0],r=t[1],o=function(e,t){return function(a){("keydown"!==a.type||"Tab"!==a.key&&"Shift"!==a.key)&&r(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,Object(c.a)({},e,t)))}};return a.a.createElement(a.a.Fragment,null,a.a.createElement(f.a,{style:{textAlign:"center",background:"gray"}},a.a.createElement(y.a,{onClick:o("bottom",!0),variant:"contained",color:"primary"},"OPEN TAB")),a.a.createElement(w.a,{anchor:"bottom",open:n.bottom,onClose:o("bottom",!1)},a.a.createElement(O,null)),a.a.createElement(b,null))}),null)," "),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[38,1,2]]]);
//# sourceMappingURL=main.31316948.chunk.js.map
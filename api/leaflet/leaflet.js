console.log("joojthewarrior");
var map = L.map('map', {
    center: [51.505, -0.09],
    minZoom: 2.9,
    maxZoom: 2.9,
    dragging: false,
    zoomControl: false,
    doubleClickZoom: false
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.setView([27, 12.121257773548779], 2.9);

L.geoJson(countriesData).addTo(map);

/* example of how to add markers / polygons / lines to the map
var marker = L.marker([51.5, -0.09]);
marker.addTo(map);
*/

/* example of event listeners for when the map changes
map.on('move', () => {
    var ll = map.getCenter();
    console.log(`${ll.lat}, ${ll.lng}`);
});
*/

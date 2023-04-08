console.log("joojthewarrior");
var map = L.map('map', {
    center: [51.505, -0.09],
    minZoom: 2.53,
    maxZoom: 2.53,
    dragging: false,
    zoomControl: false
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.setView([23.276495031663973, 12.121257773548779], 2.53);

/* example of how to add markers / polygons / lines to the map
var marker = L.marker([51.5, -0.09]);
marker.addTo(map);
*/

// Event listeners for when the map changes
map.on('move', () => {
    var ll = map.getCenter();
    console.log(`${ll.lat}, ${ll.lng}`);
});

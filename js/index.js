function showMap() {
  var map = tt.map({
    key: 'YGOSC3vaMIRj32nNnQoYktX5D3svhpM2',
    container: 'map',
    style: 'tomtom://vector/1/basic-main',
    center: [8, 51],
    zoom: 4
  });

  var config = {
    key: 'YGOSC3vaMIRj32nNnQoYktX5D3svhpM2',
    style: 'tomtom://vector/1/relative'
  };

  map.on('load', function() {
    map.addTier(new tt.TrafficFlowTilesTier(config));
  });
}

window.onload = function() {
  showMap();
}

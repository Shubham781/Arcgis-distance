require([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/geometry/geometryEngine",
    "esri/layers/GraphicsLayer"
], function(WebScene, SceneView, Graphic, Point, geometryEngine, GraphicsLayer) {
    const scene = new WebScene({
        basemap: "topo-vector"
    });

    const view = new SceneView({
        container: "viewDiv",
        map: scene,
        center: [0, 0],
        zoom: 2,
        constraints: {
            altitude: {
                min: 1000000,
                max: 25000000
            }
        }
    });

    const graphicsLayer = new GraphicsLayer();
    scene.add(graphicsLayer);

    let points = [];

    view.when(() => {
        document.getElementById("loadingDiv").style.display = "none";
    });

    view.on("click", function(event) {
        const point = new Point({
            longitude: event.mapPoint.longitude,
            latitude: event.mapPoint.latitude
        });

        const graphic = new Graphic({
            geometry: point,
            symbol: {
                type: "simple-marker",
                color: [226, 119, 40],
                size: 10,
                outline: {
                    color: [255, 255, 255],
                    width: 2
                }
            }
        });

        graphicsLayer.add(graphic);
        points.push(point);

        if (points.length === 2) {
            const distance = geometryEngine.geodesicDistance(points[0], points[1], "kilometers");
            document.getElementById("distanceValue").textContent = distance.toFixed(2);
            
            // Draw a line between the points
            const lineGraphic = new Graphic({
                geometry: {
                    type: "polyline",
                    paths: [[points[0].longitude, points[0].latitude], [points[1].longitude, points[1].latitude]]
                },
                symbol: {
                    type: "simple-line",
                    color: [226, 119, 40],
                    width: 2
                }
            });
            graphicsLayer.add(lineGraphic);

            // Reset points for next measurement
            points = [];
        }
    });

    // Improve performance
    view.environment.lighting.directShadowsEnabled = false;
    view.environment.lighting.ambientOcclusionEnabled = false;
    view.qualityProfile = "low";

    // Add functionality to clear button
    document.getElementById("clearButton").addEventListener("click", () => {
        graphicsLayer.removeAll();
        points = [];
        document.getElementById("distanceValue").textContent = "0";
    });
});

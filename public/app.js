require([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/geometry/geometryEngineAsync",
    "esri/layers/GraphicsLayer",
    "esri/geometry/SpatialReference"
], function(WebScene, SceneView, Graphic, Point, geometryEngineAsync, GraphicsLayer, SpatialReference) {
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
        if (points.length >= 2) return; // Limit to two points

        const point = new Point({
            longitude: event.mapPoint.longitude,
            latitude: event.mapPoint.latitude,
            spatialReference: SpatialReference.WGS84
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
            calculateDistance();
        }
    });

    function calculateDistance() {
        geometryEngineAsync.geodesicLength(
            {
                paths: [[
                    [points[0].longitude, points[0].latitude],
                    [points[1].longitude, points[1].latitude]
                ]],
                type: "polyline",
                spatialReference: SpatialReference.WGS84
            },
            "kilometers"
        ).then(distance => {
            document.getElementById("distanceValue").textContent = distance.toFixed(2);
            
            const lineGraphic = new Graphic({
                geometry: {
                    type: "polyline",
                    paths: [[points[0].longitude, points[0].latitude], [points[1].longitude, points[1].latitude]],
                    spatialReference: SpatialReference.WGS84
                },
                symbol: {
                    type: "simple-line",
                    color: [226, 119, 40],
                    width: 2
                }
            });
            graphicsLayer.add(lineGraphic);
        }).catch(error => {
            console.error("Error calculating distance:", error);
        });
    }

    // Improve performance
    view.environment.lighting.directShadowsEnabled = false;
    view.environment.lighting.ambientOcclusionEnabled = false;
    view.qualityProfile = "low";

    // Add functionality to clear button
    document.getElementById("clearButton").addEventListener("click", () => {
        graphicsLayer.removeAll();
        points = [];
        document.getElementById("distanceValue").textContent = "0.00";
    });
});

<h1>ArcGIS Distance Measurement Tool</h1>

<p><h2>Description</h2></p>
<p>This project is a web application that uses the ArcGIS JavaScript API to create an interactive map where users can measure the geodesic distance between two points on the globe. The app provides a simple and intuitive interface for users to click on two locations and instantly see the distance between them.</p>

<p><h2>Features</h2></p>
<ul>
    <li>Interactive 3D globe using ArcGIS WebScene</li>
    <li>Click to place two points on the map</li>
    <li>Automatic calculation of geodesic distance between the two points</li>
    <li>Visual representation of the measured distance with a line</li>
    <li>Clear button to reset the measurement</li>
    <li>Responsive design for various screen sizes</li>
</ul>

<p><h2>Installation</h2></p>
<ol>
    <li>Clone this repository to your local machine.</li>
    <li>Ensure you have Node.js installed on your system.</li>
    <li>Run <code>npm install</code> to install the required dependencies.</li>
    <li>Start the server by running <code>node server.js</code>.</li>
    <li>Open a web browser and navigate to <code><a href="http://localhost:3000">http://localhost:3000</a></code>.</li>
</ol>

<p><h2>Usage</h2></p>
<ol>
    <li>Click on two different locations on the globe.</li>
    <li>The geodesic distance between the two points will be calculated and displayed.</li>
    <li>To start a new measurement, click the &quot;Clear&quot; button and repeat the process.</li>
</ol>

<p><h2>Files in the Project</h2></p>
<ul>
    <li><code>server.js</code>: Node.js server file to serve the application.</li>
    <li><code>public/index.html</code>: The main HTML file for the web application.</li>
    <li><code>public/app.js</code>: The JavaScript file containing the main application logic.</li>
    <li><code>public/styles.css</code>: (Optional) A CSS file for additional styling if needed.</li>
    <li><code>public/arcgis_js_api/</code>: Directory containing the ArcGIS JavaScript API files (to be added by the user).</li>
    <li><code>package.json</code>: Node.js package configuration file.</li>
    <li><code>README.md</code>: This file, containing project information and instructions.</li>
</ul>

<p><h2>Dependencies</h2></p>
<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>ArcGIS JavaScript API (version 4.22 or later)</li>
</ul>

<p><h2>Note on ArcGIS JavaScript API</h2></p>
<p>This project uses the ArcGIS JavaScript API. (Link -  <a href="https://developers.arcgis.com/web-appbuilder/">https://developers.arcgis.com/web-appbuilder/</a>) You need to ensure that the API files are correctly placed in the <code>public/arcgis_js_api/</code> directory. If you prefer, you can also use the CDN version of the API by updating the links in the <code>index.html</code> file.</p>

<p><h2>Contributing</h2></p>
<p>Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.</p>

<p><h2>License</h2></p>
<p>This project is licensed under the MIT License - see the LICENSE file for details.</p>

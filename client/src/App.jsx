// App.jsx
import React from "react";

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h3>Streamed video (HTTP Range)</h3>
      <video
        controls
        width={800}
        height={450}
        src="https://streaming-node-js-1.onrender.com"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
<p align="center">
  <img src="https://github.com/tobua/timeline-canvas/raw/main/screenshot.png" alt="timeline-canvas" width="300">
</p>

# Timeline Chart - Challenge for Algorithm Arena

Dynamically generated timeline chart in the browser. Submission for the seventh weekly challenge on [Algorithm Arena](https://github.com/Algorithm-Arena/weekly-challenge-7-scores-timeline). The project uses **Canvas**, **Cursor AI**, **Bun**, **React**, **TypeScript**, **Rsbuild** and **Biome**.

## Description

The chart is dynamically rendered afresh with each frame in an HTML `canvas` element, ensuring a smooth and dynamic appearance. When viewed in the browser, the chart is fully responsive. Users can choose from various data sources, some real and others filled with random values at runtime. Underneath the chart, a set of options allows users to configure various parameters to tailor the chart rendering to their specific needs. Additionally, a performance indicator is provided to show whether each frame can be rendered within the allotted time. To enhance the smoothness of the chart lines, they are rendered as cubic splines. The canvas animation can be recorded and downloaded as an mp4 video, with optimal results in Safari and some compatibility issues in Chrome.

I found the implementation of this challenge in [Cursor AI](https://cursor.sh) particularly effective, leveraging AI coding assistance to a greater extent than ever before. Prior to this project, my knowledge of canvas was limited, but with the support of the default language model, which possesses extensive knowledge of the canvas interface and its usage, the process became surprisingly helpful.

## Demo

See this [𝕏 Post](https://twitter.com/matthiasgiger/status/1764555624019349885) or try the [live version](https://timeline-canvas.vercel.app).

## Installation

```sh
bun install
bun start # Start and open the application in the browser.
bun format # Format files with Biome.
bun lint # Lint files with Biome.
bun run build & bun preview # Production preview.
```

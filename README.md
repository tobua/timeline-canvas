<p align="center">
  <img src="https://github.com/tobua/timeline-chart/raw/main/screenshot.png" alt="timeline-chart" width="300">
</p>

# Timeline Chart - Challenge for Algorithm Arena

Dynamically generated timeline chart in the browser. Submission for the seventh weekly challenge on [Algorithm Arena](https://github.com/Algorithm-Arena/weekly-challenge-7-scores-timeline). The project uses **Canvas**, **Cursor AI**, **Bun**, **React**, **TypeScript**, **Rsbuild** and **Biome**.

## Description

The chart is rendered anew with each frame in an HTML `canvas` element. This way the chart is rendered smoothly and appears very dynamic. Rendered in the browser the chart is also fully responsive.

It's possible to pick several data sources, some of them real and others filled with random values at runtime.

Using the options below the chart it's possible to configure various parameters used to render the chart according to user needs.

I don't think I've ever been able to use AI coding assistance more effectively than while implementing this challenge in [Cursor AI](https://cursor.sh). Since my canvas knowledge was super limited prior to implementing this and the default LLM knows a lot about this interface and how it's used, it was surprisingly helpful.

## Demo

See this [𝕏 Post](https://twitter.com/matthiasgiger/status/1759485186666807649) or try the [live version](https://timeline-chart.vercel.app).

## Installation

```sh
bun install
bun start # Start and open the application in the browser.
bun format # Format files with Biome.
bun lint # Lint files with Biome.
bun run build & bun preview # Production preview.
```

async function run() {
  try {
    // Import the app from the ES module created during ng build
    const server = await import("./server/server.mjs");
    const app = await server.app();

    const port = process.env["PORT"] || 4000;

    // Start up the Node server
    app.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to import app:", error);
  }
}

run();
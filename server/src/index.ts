import Loaders from "./loaders";

Loaders.load()
  .then(async () => {
    console.log("All precess are running...");
  })
  .catch(console.error)
import { initializedApp } from "./app";
import { v1App } from "./routes/v1.route";

const app = initializedApp();

v1App(app);

export default app;

import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { feature } from "./routes/feature";

const app = new Elysia()
.use(swagger())
.use(feature)
.listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

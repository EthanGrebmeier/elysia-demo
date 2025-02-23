import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import ContentStack from "../lib/contentstack";
import { QueryOperation } from "@contentstack/delivery-sdk";



export const feature = new Elysia({prefix: "/feature"})
.use(clerkPlugin({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY
}))
.guard(
  {
  beforeHandle({ auth, error }) {
    if (!auth?.userId) return error(401, "Unauthorized")
  }
}, (app) =>
  app
  .get("/", async ({ auth, clerk, error }) => {
    if (!auth?.userId) return error(401, "Unauthorized")
    const user = await clerk?.users.getUser(auth?.userId)
    console.log("Features Accessed by", user?.emailAddresses[0].emailAddress)

    const content = await ContentStack.contentType("feature").entry().find()

    return content
  })
  .get('/:slug', async ({ auth, clerk, params: {slug}, error }) => {
    if (!auth?.userId) return error(401, "Unauthorized")
      const user = await clerk?.users.getUser(auth?.userId)
      console.log("Features Accessed by", user?.emailAddresses[0].emailAddress)

      const feature = await ContentStack.contentType("feature").entry().query().where("slug", QueryOperation.EQUALS, slug).find()
    return {
      test: "From Railway",
      feature
    }
  }, {
    params: t.Object({
      slug: t.String()
    })
  })
)

import { createApp, close, createHttpRequest } from "@midwayjs/mock";
import { Framework } from "@midwayjs/web";
import { Application } from "egg";

describe("test/controller/user.test.ts", () => {
  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });
  
  it("should POST /api/user/createUser", async () => {
    // make request
    const result = await createHttpRequest(app)
      .post("/api/user/createUser")
      .query({ username: "lands", password: "123456789" });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should POST /api/user/login", async () => {
    // make request
    const result = await createHttpRequest(app)
      .post("/api/user/login")
      .query({ username: "lands", password: "123456789" });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
  });

  it("should POST /api/user/login", async () => {
    // make request
    const result = await createHttpRequest(app)
      .post("/api/user/login")
      .query({ username: "lands", password: "123" });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(false);
  });
});

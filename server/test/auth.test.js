import supertest from "supertest";
import app from "../server.js";

describe("POST /api/auth/register", () => {
  describe("give invalid data", () => {
    it("should response with a 400 status code", async () => {
      const response = await supertest(app).post("/api/auth/register").send({
        first_name: "John",
        last_name: "Doe",
        password: "123456",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

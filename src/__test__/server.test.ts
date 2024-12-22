import request from "supertest"
import server from "../server"
import { response } from "express"


describe("GET /api/", () => {

    test("Check if /api/ is exists", async () => {
        const res = await request(server).get("/api")
        expect(res.status).not.toBe(404)

    })

    test("Get products list", async () => {
        const res = await request(server).get("/api")
        expect(res.status).toBe(200)
        expect(res.header["content-type"]).toMatch("application/json")
        expect(res.body).not.toHaveProperty("errors")
    })

    test("check a a non-exist product ID in the URL", async () => {
        const id = 2000
        const res = await request(server).get(`/api/${id}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toBe("Producto no encontrado")

    })

    test("check a invalid product id in the URL", async () => {
        const id = 2000
        const res = await request(server).get(`/api/${id}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("errors")

    })

    test("get a exist product by id", async () => {
        const id = 1
        const res = await request(server).get(`/api/${id}`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")


    })

})

describe("POST /api/", () => {

    test("POST /api/", async () => {
        const res = await request(server).post("/api").send({
            name: "Producto de testeo",
            price: 999,
        })
        expect(res.status).toBe(201)
    })


    test("POST /api/ (errors)", async () => {
        const res = await request(server).post("/api").send({})
        expect(res.status).toBe(400)
    })

    test("POST /api/ price is number and more than 0", async () => {
        const res = await request(server).post("/api").send({
            name: "Producto de testeo",
            price: 0,
        })
        expect(res.status).toBe(400)
    })
})


describe("PUT /api/", () => {
    test("validation error messages with object empty", async () => {
        const res = await request(server).put("/api/1").send({})
        expect(res.status).toBe(400)
        expect(res.body.errors).toBeTruthy()
        expect(res.body).toHaveProperty("errors")

        expect(res.status).not.toBe(200)
    })

    test("validation error messages with non-exist URL ", async () => {
        const res = await request(server).put("/api/hola").send({
            name: "Hola",
            price: 300
        })
        expect(res.status).toBe(400)
        expect(res.body.errors).toBeTruthy()
        expect(res.body).toHaveProperty("errors")

        expect(res.status).not.toBe(200)
    })

    test("validation without errors", async () => {
        const res = await request(server).put("/api/1").send({
            name: "Hola",
            price: 300
        })

        expect(res.status).toBe(200)
        expect(res.body.error).not.toBeTruthy()
        expect(res.body).toHaveProperty("data")

    })

    test("validation non-exist id", async () => {
        const id = 3123

        const res = await request(server).put(`/api/${id}`).send({
            name: "Hola",
            price: 300
        })

        expect(res.status).toBe(404)
        expect(res.body.errors).toBeTruthy()
        expect(res.body).toHaveProperty("errors")

        expect(res.status).not.toBe(200)

    })
})



describe("PATCH /api/", () => {


    test("validation error messages with non-exist URL ", async () => {
        const res = await request(server).patch("/api/hola").send({
            name: "Hola",
            price: 300
        })
        expect(res.status).toBe(400)
        expect(res.body.errors).toBeTruthy()
        expect(res.body).toHaveProperty("errors")

        expect(res.status).not.toBe(200)
    })

    test("validation without errors", async () => {
        const res = await request(server).patch("/api/1").send({
            name: "Hola",
            price: 300
        })

        expect(res.status).toBe(200)
        expect(res.body.error).not.toBeTruthy()
        expect(res.body).toHaveProperty("data")

    })

    test("validation non-exist id", async () => {
        const id = 3123

        const res = await request(server).patch(`/api/${id}`).send({
            name: "Hola",
            price: 300
        })

        expect(res.status).toBe(404)
        expect(res.body.errors).toBeTruthy()
        expect(res.body).toHaveProperty("errors")

        expect(res.status).not.toBe(200)

    })
})


describe("DELETE /api/:id", () => {
    test("validation non-exist id", async () => {
        const id = 3123

        const res = await request(server).delete(`/api/${id}`).send()

        expect(res.status).toBe(404)
        expect(res.body.errors).toBeTruthy()
        expect(res.body).toHaveProperty("errors")

        expect(res.status).not.toBe(200)
    })

    test("validation with exist id", async () => {
        const id = 1

        const res = await request(server).delete(`/api/${id}`).send()

        expect(res.status).toBe(200)
        expect(res.body.errors).not.toBeTruthy()
        expect(res.body).toHaveProperty("data")


    })
})
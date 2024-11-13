import express from 'express'
import { json } from 'body-parser'
import connectToDb from './config/connect'
import version_one_routes from "./route/v1/version_one"
import socket from './socket'
const app = express()

app.use(json())

app.listen(3020, () => {
    connectToDb()
    socket()
    console.log("SERVER => 3020")
})

app.use("/api/v1", version_one_routes)
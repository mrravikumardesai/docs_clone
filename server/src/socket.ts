import { Server } from 'socket.io';
import express from 'express'
import http from 'http';
import Docs from './model/docs';

const app = express();
const server = http.createServer(app);

const defalutValue = "DEFAULT"

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ['GET', "POST"]
    },
})

const socket = () => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        socket.on("get-document", async (documentId) => {
            const document = await findOrCreateDoc(documentId)
            socket.join(documentId)
            socket.emit("load-document", document)
            socket.emit("load-title", document.title)
            // Listen for changes sent by clients and broadcast them to others
            socket.on('send-changes', (delta: any) => {
                // socket.emit("get-changes", delta)
                console.log(delta)

                socket.broadcast.to(documentId).emit("recieve-changes", delta)
            });

            socket.on("save-doc", async data => {
                console.log("SAVE THE DOC")
                await Docs.findByIdAndUpdate(documentId, { doc: data })
            })

            // socket.emit("get-all-docs",await Docs.find({}))
        })


        socket.on("findAllDocs", async () => {
            socket.emit("get-all-docs", await Docs.find({}))
        })

        socket.on("deleteDoc", async (id) => {
            await deleteDoc(id)
            socket.emit("get-all-docs", await Docs.find({}))
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });

        socket.on("save-title", async data => {
            await Docs.findByIdAndUpdate(data.id, { title: data.title })
        })
    });
}

const findOrCreateDoc = async (id: string | null): Promise<Docs> => {
    const document = await Docs.findById(id)
    if (document) return document
    const createDoc = await Docs.create({
        _id: id,
        doc: defalutValue,
        title: "untitled"
    })
    return createDoc
}

const deleteDoc = async (id: string) => {
    await Docs.findByIdAndDelete(id)
}

server.listen(3022, () => {
    console.log(`SOCKET => 3022`);
});

export default socket
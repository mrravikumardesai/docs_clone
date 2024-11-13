import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'

import { io, Socket } from 'socket.io-client';
import { Delta } from 'quill';
import { useParams } from 'react-router-dom';
import { AppBar, Box, Button, TextField, Toolbar } from '@mui/material';


function DocumentPage() {
    const { id: documentId } = useParams()
    const SAVE_INTERVAL_SECONDS = 2000;
    const [quill, setQuill] = useState<ReactQuill | null>(null);
    const [editorContents, setEditorContents] = useState<Delta | undefined>(undefined);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [docTitle, setDocTitle] = useState("")
    const handleChange = (content: any, delta: any, source: any, editor: any) => {
        // Handle changes, and if needed, update the editor's content
        if (source === 'user') {
            setEditorContents(content);
            if (socket) {
                socket.emit('send-changes', delta);
            }
        }
    };

    useEffect(() => {
        const s = io('http://192.168.0.114:3022');
        setSocket(s)
        s.on('recieve-changes', (delta) => {
            // Update the Quill editor's content
            console.log("RECIEVE THE CHANGE")
            if (quill) {
                quill.getEditor().updateContents(delta);
            }
        });
        if (quill == null) return
        quill.getEditor().disable()
        quill.getEditor().setText("LOADING")

        return () => {
            s.disconnect()
        }
    }, [quill]);

    useEffect(() => {
        if (socket == null || quill == null) return
        socket.once("load-document", async document => {
            console.log("GET DOC", document)
            quill.getEditor().enable()
            quill.getEditor().setContents(document.doc)
        })
        socket.once("load-title", async title => {
            console.log(title, "THE TIEL")
            // await Promise.all(
            // quill.getEditor().enable()
            // quill.getEditor().setContents(document.doc)
            setDocTitle(title)
            // ])
        })

        socket.emit("get-document", documentId)
    }, [socket, quill, documentId])

    useEffect(() => {
        if (socket == null || quill == null) return
        const interval = setInterval(() => {
            socket.emit("save-doc", quill.getEditor().getContents());
        }, SAVE_INTERVAL_SECONDS)
        return () => {
            clearInterval(interval)
        }
    }, [quill, socket])


    const saveName = (id: string | undefined, title: string) => {
        if (socket == null || quill == null || id == null) return

        socket.emit("save-title", { id, title })
    }

    return (
        <>
            {/* <TextField id="standard-basic" label="Name" variant="standard" /> */}

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#0F2C59", color: "#ffffff" }}>
                    <Toolbar>
                        <Box role='div'
                            sx={{ flexGrow: 1, color: "#ffffff" }} >
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                value={docTitle}
                                sx={{
                                    "& .MuiInput-input": {
                                        borderBottom: "none",
                                        color: "#ffffff",
                                        // borderBottom:"1px solid white"
                                    },
                                }}
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setDocTitle(e.target.value)
                                    saveName(documentId, e.target.value)
                                }}
                            />
                        </Box>

                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <ReactQuill
                value={editorContents}
                onChange={handleChange}
                formats={[
                    'header', 'bold', 'italic', 'underline', 'strike',
                    'list', 'bullet', 'link', 'image', 'align',
                ]}
                theme={"snow"}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],

                        [{ 'header': 1 }, { 'header': 2 },],               // custom button values
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                        [{ 'direction': 'rtl' }],                         // text direction

                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown


                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'font': [] }],
                        [{ 'align': [] }],

                        ['clean']

                    ]
                }}

                ref={(el) => {
                    if (el && !quill) {
                        console.log(el, "THE EL")
                        setQuill(el);
                    }
                }}
            />
        </>

    )
}

export default DocumentPage
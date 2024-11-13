import React, { useEffect, useState } from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import { Socket, io } from 'socket.io-client';
import { v4 as uuidV4 } from "uuid"
import Card from '@mui/material/Card';
import { AppBar, Box, Button, CardActions, CardContent, Chip, IconButton, Toolbar, Typography } from '@mui/material';
import { Delete, DeleteForeverOutlined, DeleteForeverTwoTone, RemoveRedEyeRounded } from '@mui/icons-material';
import moment from 'moment';
export default function HomePage() {
  const navigate = useNavigate()
  const [socket, setSocket] = useState<Socket | null>(null);

  const [records, setRecords] = useState<any | null>([])

  useEffect(() => {
    const s = io('http://192.168.0.114:3022');
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, []);

  useEffect(() => {
    if (socket == null) return
    console.log("RETURN")
    socket.on('get-all-docs', (docs) => {
      // Update the Quill editor's content
      setRecords(
        docs
      )
      console.log(docs, "FIND DOCS")
    });
    socket.emit("findAllDocs", "ALNT")
  }, [socket])

  const handleOpen = (id: string) => {
    navigate(`/document/${id}`)
  }

  const handleNew = () => {
    navigate(`/document/${uuidV4()}`)
  }

  const handleDelete = (id: string) => {
    if (socket == null) return
    socket.emit("deleteDoc", id)
  }

  return (

    <Box role="div" sx={{ backgroundColor: "#F8F0E5" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#0F2C59" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Docs
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box role='div' sx={{ display: "flex", alignItems: "end", justifyContent: "end", paddingY: "1vh", paddingX: "10vh" }}>
        <Button
          variant='outlined'
          sx={{ textAlign: 'end' }}
          onClick={() => handleNew()}
        >Add</Button>
      </Box>
      <Box role="div" sx={{ display: "flex", flexDirection: "row", alignItems: 'start', justifyContent: "center", flexWrap: "wrap", marginTop: "10px", gap: 1, minHeight: "80vh" }}>

        {records &&
          records.map((item: any) => {
            return (
              <Card variant="outlined" sx={{ width: "25rem" }} key={item._id}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {moment(item.createdAt).format("MMM Do YY")}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {item.title.substr(0, 20) + (item.title.length > 20 ? "..." : "") ?? "UNTITLED"}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', alignItems: "center", justifyContent: "end" }}>
                  <Chip label="View" onClick={() => handleOpen(item._id)} />
                  <IconButton onClick={() => handleDelete(item._id)}> <DeleteForeverTwoTone color='error' sx={{ width: "25px", height: "25px" }} /></IconButton>
                </CardActions>
              </Card>
            )
          })
        }

      </Box>
    </Box>

  )
}


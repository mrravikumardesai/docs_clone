import express, { Router } from 'express'
import DocsController from '../../controller/v1/DocsController'

const router: Router = express.Router()

router.route("/add").post(DocsController.addDoc)

export default router

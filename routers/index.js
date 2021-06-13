const productRouter = require('./product_router')
const userRouter = require('./user_router')
const focusRouter = require('./focus_router')
const express = require('express')
const router = express.Router()
router.use("/", productRouter)
router.use("/users", userRouter)
router.use("/focus", focusRouter)

module.exports = router


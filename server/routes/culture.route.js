import express from 'express'
import db from '../model/db.js'

export const cultureRouter = express.Router()

//Getting user cultures comments
cultureRouter.post('/culture/comment', async (req, res) => {
    const { id } = req.body

    //getting from database
    const q = "select * from comments where culture_id=?"
    const [result] = await db.execute(q, [id])

    res.json(result)
})


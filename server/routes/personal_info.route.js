import express from 'express'
import db from '../model/db.js'


export const personalRouter = express.Router()


//Getting the user info
personalRouter.get('/profile/:user_id', async (req, res) => {
    const { user_id } = req.params
    console.log(user_id)

    //Fetching from the database
    const q = "select name,email,image_url,id from users where id=?"
    const [result] = await db.execute(q, [user_id])

    if (result.length === 0) {
        return res.status(401).json({ message: "no user exist" })
    }

    res.json({ user_id, result })
})

//Getting profile image
personalRouter.post('/profile/upload', async (req, res) => {
    const { image_url, id } = req.body

    //into database
    const q = 'update users set image_url= ? where id= ?'
    const [result] = await db.execute(q, [image_url, id])
    res.json({ image_url, result })
})

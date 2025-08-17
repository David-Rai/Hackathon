import express from 'express'
// import db from '../model/db_local.js'
import jwt from 'jsonwebtoken'
import db from '../model/db.js'


export const reportRouter = express.Router()

//For getting the report comments
reportRouter.post('/report/comment', async (req, res) => {
    const { report_id } = req.body

    //Getting from the database
    const q = 'select * from comments where report_id = ?'
    const [result] = await db.execute(q, [report_id])
    res.json(result)
})

//For getting the report Helps
reportRouter.post('/report/help', async (req, res) => {
    const { report_id } = req.body

    //Getting from the database
    const q = 'select * from helps where report_id = ?'
    const [result] = await db.execute(q, [report_id])
    res.json(result)
})
//For getting the helps for original user
reportRouter.post('/report/notification/helps', async (req, res) => {
    const { original_user_id } = req.body

    //Getting from the database
    const q = 'select * from helps where original_user_id= ?'
    const [result] = await db.execute(q, [original_user_id])
    res.json(result)
})
//For getting all the reports data
reportRouter.get('/report', async (req, res) => {

    //fetching from the database
    const q = "select * from reports"
    const [result] = await db.execute(q)

    res.json(result)
})

//For getting specific user reports
reportRouter.post('/reports', async (req, res) => {
    const { username } = req.body

    // const { token } = req.cookies
    // const decoded = jwt.verify(token, process.env.SECRET)
    // const { username } = decoded

    //Getting from the database
    const q = 'select * from reports where user_id = ?'
    const [results] = await db.execute(q, [username])

    // console.log(results)

    res.json(results)
})

//For gettign saved reports
reportRouter.post('/saved-reports', async (req, res) => {
    // console.log("saved reports routes")
    const { user_id } = req.body
    console.log(user_id)

    const query = `
    SELECT r.*
    FROM saved_reports sr
    JOIN reports r ON sr.report_id = r.id
    WHERE sr.user_id = ?
  `;
    const [results] = await db.execute(query, [user_id]);
    res.json(results)
})
import jwt from 'jsonwebtoken'
import cookie from 'cookie';
import db from '../model/db.js'
import suggestion from '../llm/suggestion.js';
import moreSummarizer from '../llm/moresummerizer.js';
import summerize from '../llm/summerizer.js';

//Handling the socket connections
export const handleSocket = (io) => {
    io.on("connection", client => {

        console.log(client.id)

        //Posting new like
        client.on('new-like', async (data) => {
            const { culture_id } = data

            //increasing the liked count
            const uq = `
         UPDATE cultures
         SET like_count = like_count + 1
         WHERE id=?;
        `
            const [uresult] = await db.execute(uq, [culture_id])
            if (uresult.affectedRows === 0) {
                console.log("No report found with that ID.");
            } else {
                console.log("comment count updated successfully.");
            }
        })

        //Posting the new comment
        client.on('new-comment', async (data) => {
            console.log("Getting the new comment", data)

            const { culture_id, user_id, comment, username } = data

            //saving into the database
            const q = 'insert into comments (culture_id,user_id,comment,username) values (?,?,?,?)'
            const [results] = await db.execute(q, [culture_id, user_id, comment, username])

            //increasing the comment count
            const uq = `
             UPDATE cultures
            SET comment_count = comment_count + 1
            WHERE id=?;
            `
            const [uresult] = await db.execute(uq, [culture_id])
            if (uresult.affectedRows === 0) {
                console.log("No report found with that ID.");
            } else {
                console.log("comment count updated successfully.");
            }

            //notifying the user
            io.emit('new-comment', { id: culture_id })

        })

        //Posting the new culture
        client.on("new-culture", async (data) => {
            console.log("new culture", data)
            try {
                const { title, description, lat, lng, username, user_id, image_url } = data

                //getting user iamge from database
                const pq = "select image_url from users where id = ?"
                const [image] = await db.execute(pq, [user_id])

                // console.log(image[0])

                //storing the data into the database
                const q = 'insert into cultures (title,description,lat,lng,username,user_id,image_url,user_image_url) values (?,?,?,?,?,?,?,?)'
                const [results] = await db.execute(q, [title, description, lat, lng, username, user_id, image_url,image[0].image_url])

                //reply for sucessfull storing data
                if (results.affectedRows) {
                    console.log("successfully saved report")
                    client.emit("added-culture")
                }

                // Proceed with decoded token
            } catch (error) {
                console.log(error)
                return; // Or disconnect client
            }
        })


        //Getting all the cultures of user
        client.on('get-cultures', async ({ id }) => {
            // console.log("getting the cultures......",id)

            const q = 'select * from cultures where user_id = ?'
            const [rows] = await db.execute(q, [id])

            // console.log(rows)
            //sending the the client or user
            client.emit('all-cultures', rows)
        })

        //Getting all the cultures 
        client.on('get-random-cultures', async () => {
            // console.log("getting the cultures......",id)

            const q = 'select * from cultures'
            const [rows] = await db.execute(q)

            // console.log(rows)
            //sending the the client or user
            client.emit('random-cultures', rows)
        })

        //Getting culture to be summerized
        client.on("summerize", async (culture) => {
            console.log(culture)
            const summerized = await summerize(culture)

            //sending to the client
            client.emit("summerized", summerized)
            console.log("summerized", summerized)
        })

        //more summerized
        client.on("more-summerize", async (data) => {
            const summerized = await moreSummarizer(data)

            console.log("summerized", summerized)

            //sending to the client
            client.emit("more-summerized", summerized)
        })

        //Users want suggestions
        client.on("get-suggestions", async ({ location, id }) => {
            console.log("user want suggestion..")

            //getting previos culture from database
            const q = 'select * from cultures where user_id = ?'
            const [results] = await db.execute(q, [id])

            const data = {
                location, previous: results
            }

            //sending to the llm
            const suggestions = await suggestion(data)
            // console.log(suggestions)
            
            client.emit("ai-suggestions", suggestions)
        })
    })

}
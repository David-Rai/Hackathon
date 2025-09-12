import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
// import db from '../model/db_local.js'
import db from '../model/db.js'

const Secret_Key = process.env.SECRET;

//Signup
export const signup = async (req, res, next) => {

    console.log("sign up process started...")
    const { username, email, password } = req.body;

    //encrypting the password
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            const error = new Error("inserting failed");
            error.status = 500;
            return next(error);
        }

        //inserting into the database
        const query = "insert into users (name,email,password) values (?,?,?)";
        const [results] = await db.execute(query, [username, email, hash]);

        //creating the jwt token 
        const payload = {
            id: results.insertId,
            email,
            username
        };

        // const token = jwt.sign(payload, Secret_Key);
        // res.cookie("token", token, {
        //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        //     sameSite: "none", // REQUIRED for cross-site
        //     secure: true,     // REQUIRED with sameSite: 'none' over HTTPS
        //     httpOnly: true    // blocks JS access for security
        //   });

        console.log("signup succesfully")

        //Returning the response object
        res.json({
            payload,
            status: 201,
            message: "successfully registered",
            results
        });
    });
}


//Signin
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("signin process started...")

    //Getting the actually data 
    const query = "select * from users where email=?";
    const [rows] = await db.execute(query, [email]);

    // creating the jwt if valid
    bcrypt.compare(password, rows[0].password, (err, result) => {
        if (err || !result) {
            const error = new Error("password is incorrect");
            error.status = 401;
            return next(error);
        }

        if (result) {
            const payload = {
                email,
                id: rows[0].id,
                username: rows[0].name
            };
            const token = jwt.sign(payload, Secret_Key);

            // res.cookie("token", token, {
            //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            //     sameSite: "none", // REQUIRED for cross-site
            //     secure: true,     // REQUIRED with sameSite: 'none' over HTTPS
            //     httpOnly: true    // blocks JS access for security
            //   });

            console.log("signin succesfully")


            //Response
            res.json({
                success: true,
                payload,
                message: "login successfully",
            });
        }
    });
}
require('dotenv').config()
const { MongoClient } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}cluster0.dnsrj7s.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dnsrj7s.mongodb.net/?retryWrites=true&w=majority`;


const client=new MongoClient(uri);
const connectDB=async()=>{
    try {
        await client.connect();
        // console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}
const users=client.db("dglabs").collection('users');
module.exports ={connectDB,users};
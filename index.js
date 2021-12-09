import express, { request, response } from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import dotenv from 'dotenv';
import { ObjectID } from "bson";
const app=express();
dotenv.config();
const PORT=process.env.PORT;
//const MONGO_URL="mongodb+srv://node_mongo:abcd123@cluster0.bf49q.mongodb.net"
const MONGO_URL=process.env.url;
async function createconnection(){
    const Client = new MongoClient(MONGO_URL);
     await Client.connect();
     return Client;
}

app.use(cors())

app.use(express.json());

const data = [
    {
        "_id":"61332341001dbd82f6679e20",
        "title":"Camera",
        "id":"1",
        "img":"https://3.img-dpreview.com/files/p/E~TS590x0~articles/2501145535/Images/Sony_a7r_III_beauty.jpeg",
        "productCategory":"electronics",
        "price":"500",
        "desc":"Sony a7R III"
    },
    {
        "_id":"61332341001dbd82f6679e21",
        "title":"Camera",
        "id":"2",
        "img":"https://4.img-dpreview.com/files/p/E~TS590x0~articles/6044780370/Nikon_D850.jpeg",
        "productCategory":"electronics",
        "price":"600",
        "desc":"Nikon D850"
    },
    {
        "_id":"61332341001dbd82f6679e23",
        "title":"Dslr Lens",
        "id":"3",
        "img":"https://www.sony.co.in/image/d9fe994a53d67b19db5a505d6a1f86e5?fmt=pjpeg&wid=1014&hei=396&bgcolor=F1F5F9&bgc=F1F5F9",
        "productCategory":"electronics",
        "price":"420",
        "desc":"FE 14 mm F1.8 GM"
    },
    {
        "_id":"61332341001dbd82f6679e24",
        "title":"Dslr Lens",
        "id":"4",
        "img":"https://www.sony.co.in/image/0873f5a12fc94dde762c2a82fbe58284?fmt=pjpeg&wid=1014&hei=396&bgcolor=F1F5F9&bgc=F1F5F9",
        "productCategory":"electronics",
        "price":"470",
        "desc":"FE 35-mm F1.4 GM"
    },
    {
        "_id":"61332341001dbd82f6679e2e",
        "title":"DSLR Lens",
        "id":"5",
        "img":"https://www.nikon.co.in/tmp/Asia/4016499630/3857477713/365508689/3015334490/1887721864/1781229958/1429477264/3353927964/3070994881.png",
        "productCategory":"event",
        "price":"300",
        "desc":"AF-S NIKKOR 24MM F/1.8G ED"
    },
    {
        "_id":"61332341001dbd82f6679e22",
        "title":"Speaker",
        "id":"6",
        "img":"https://images.unsplash.com/photo-1545454675-3531b543be5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BlYWtlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
        "productCategory":"electronics",
        "price":"300",
        "desc":"Dolby Atmos"
    },
    {
        "_id":"61332341001dbd82f6679e25",
        "title":"Bike",
        "id":"7",
        "img":"https://motoroctane.com/wp-content/uploads/2018/01/Royal-Enfield-Himalayan-Sleet-2.jpg",
        "productCategory":"automobile",
        "price":"2000",
        "desc":"manual gear"
    },
    {
        "_id":"61332341001dbd82f6679e26",
        "title":"Scooty",
        "id":"8",
        "img":"https://bikeindia.in/wp-content/uploads/2016/04/Yamaha-India-Launch-Cygnus-Ray-ZR-Scooter-1.jpg",
        "productCategory":"automobile",
        "price":"800",
        "desc":"No gear"
    },
    {
        "_id":"61332341001dbd82f6679e27",
        "title":"Hatchback",
        "id":"9",
        "img":"https://imgd.aeplcdn.com/600x337/cw/ec/37710/Maruti-Suzuki-Baleno-Right-Front-Three-Quarter-147420.jpg?wm=0",
        "productCategory":"automobile",
        "price":"5000",
        "desc":"Manual Transmission"
    },
    {
        "_id":"61332341001dbd82f6679e28",
        "title":"Sedan",
        "id":"10",
        "img":"https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http://cms.haymarketindia.net/model/uploads/modelimages/BMW-3Series.jpg&w=373&h=245&q=75&c=1",
        "productCategory":"automobile",
        "price":"10000",
        "desc":"Manual Transmission"
    },
    {
        "_id":"61332341001dbd82f6679e29",
        "title":"Suv",
        "id":"11",
        "img":"https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?q=85",
        "productCategory":"automobile",
        "price":"7000",
        "desc":"Automatic Transmission"
    },
    {
        "_id":"61332341001dbd82f6679e2a",
        "title":"MPV",
        "id":"12",
        "img":"https://cdni.autocarindia.com/utils/imageresizer.ashx?n=http://cms.haymarketindia.net/model/uploads/modelimages/Toyota-Innova-Crysta-181220201502.JPG&w=350&h=251&q=90&c=1",
        "productCategory":"automobile",
        "price":"7500",
        "desc":"Automatic Transmission"
    },
];

app.get("/data", (request, response) => {
    response.send("data");
});

app.get("/cart",async(request,response)=>{
    const Client= await createconnection();
    const result = await Client.db("flipkart").collection("cart").find({}).toArray();
    response.send(result);
})

app.post("/cart",async(request,response)=>{
    const cartdata = request.body;
    console.log(cartdata)
    const Client= await createconnection();
    const result = await Client.db("flipkart").collection("cart").insertMany(cartdata);
    response.send(result);
})

app.delete("/cart/:id",async(request,response)=>{
    const {id} = request.params;
    const Client= await createconnection();
    const result =  await Client.db("flipkart").collection("cart").deleteOne({_id : ObjectID(id)})
    response.send(result)
})

app.listen(PORT,()=>{console.log("executed",PORT)})
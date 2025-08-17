import { MongoClient,Db,Collection } from "mongodb";
const uri=process.env.MONGODB_URI;
if(!uri){
    throw new Error("MONGODB_URI is not defined");
}
let client:MongoClient
let db:Db
export async function connectToDatabase(){
   if(!client){
    client=new MongoClient(uri as string);
    await client.connect()
    db=client.db('Todo-app2')
   }
    return{client,db}
}
export async function getTodoCollection():Promise<Collection>{
    if(!db){
        const{db:database}=await connectToDatabase()
        return database.collection('todo')
    }
    return db.collection('todo')
}

import { NextRequest, NextResponse } from "next/server";
interface user{
    params:{
        username:string
    }
}
export async function GET(_req:NextRequest,{params}:user){
    const data={username:params.username}
    return NextResponse.json(data)
}
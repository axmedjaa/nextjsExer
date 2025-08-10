"use server"
interface formState{
    message:string,
    error:string
}
export async function submitEmail(prevState:formState,formData:FormData):Promise<formState>{
    const email=formData.get('email') as string
    if(!email||!email.includes('@')){
        return {message:"",error:"email is required"}
    }
    return {message:`thank you for submitting ${email}`,error:""}
}
export async function submitPassword(prevState:formState,formData:FormData):Promise<formState>{
    const password=formData.get('password') as string
    if(!password||password.length<6){
        return{message:"",error:"password must be atleat 6 character"}
    }
    return {message:"success password",error:""}
}
export async function submitFullName(prevState:formState,formData:FormData):Promise<formState>{
    const firstName=formData.get("firstName") as string
    const lastName=formData.get("lastName") as string
    if(!firstName||!lastName){
        return {message:"",error:"first name or last name is required"}
    }
    return {message:`hello ${firstName} ${lastName}`,error:""}
}
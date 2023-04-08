import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const connectDB =async ()=>{
    const nameDB = 'Fadfed'
    return await mongoose.connect(`mongodb://localhost:27017/${nameDB}`).then(
        res=>{
            console.log("connected DB")
        }).catch(err=>{
            console.log(`failconnected ${err}`)
        })



}
export default connectDB

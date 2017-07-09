import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const adminSchema = new Schema({
	useName:String,
	password:String,
	id:Number,
	creatTime:String
})

adminSchema.index({id:1});

const Admin = mongoose.model('Admin',adminSchema);

export default Admin
import config from 'config'
import mongoose from 'mongoose'

const db = mongoose.connect(config.url,{server:{auto_reconnect:true}})
mongoose.Promise = global.Promise

db.connection.on('open',()=>{
	console.log('链接数据库成功');
})

db.connection.on('error',(err)=>{
	console.log('链接数据库失败'+err);
	mongoose.disconnect();
})

db.connection.on('close',()=>{
	console.log('数据库断开，重新连接数据库')
	mongoose.connect(config.url, {server:{auto_reconnect:true}});
})

export default db;
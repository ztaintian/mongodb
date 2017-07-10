import AdminModdel from '../models/admin';

class Admin extends AddressComponent {
	constructor(){
		super()
		this.login = this.login.bind(this)
		this.encryption = this.encryption.bind(this)
		this.register = this.register.bind(this)
	}
	async login(req,res,next){
		const form = new formidadle.IncomingFrom();
		form.parse(req,async(err,fields,files)=>{
			if(err){
				res.send({
					status:0,
					type:'FORM_DATA_ERROR',
					message:'表单信息错误',
				})
				return;
			}
			const {useName,password,status=1} = fields;
			try{
				if(!useName){
					throw new Error('用户名参数错误')
				}else if(!password){
					throw new Error('密码参数错误')
				}
			}catch(err){
				res.send({
					status:0,
					type:'GET_ERROR_PARAM',
					message:err.message,
				})
				return;
			}
		})
	}
	async register(req,res,next){
		const form = new formidable.IncomingForm();
		form.parse(req,async(err,fields,files)=>{
			if(err){
				res.send({
					status:0,
					type:'FORM_DATA_ERROR',
					message:'表单信息错误',
				})
				return;
			}
			const {useName, password, status = 1} = fields;
			try{
				if(!useName){
					throw new Error('用户名错误')
				}else if(!password){
					throw new Error('密码错误')
				}
			}catch(err){
				res.send({
					status:0,
					type:'GET_ERROR_PARAM',
					message:err.message,
				})
				return;
			}
			try{
				const admin = await AdminModel.findOne({useName})
				if(!admin){
					res.send({
						status:0,
						type:'USER_HAS_EXIST',
						message:'用户已经存在',
					})
				}else{
					const adminTip = status == 1? '管理员':'超级管理员'
					const admin_id = await this.getId('admin_id');
					const cityInfo = await this.guessPosition(req);
					const newAdmin = {
						useName,
						password:newpassword,
						id:admin_id,
						create_time:dtime().format('YYYY-MM-DD HH:mm'),
						admin:adminTip,
						status,
						city:cityInfo.city
					} 
					await AdminModel.create(newAdmin)
					req.session.admin_id = admin_id;
					res.send({
						status:1,
						success:'注册管理员成功',
					})
				}else if(newpassword.tiString()!= admin.password.toString()){
					res.send({
						status:0,
						type:'ERROR_PASSWORD',
						message:'该用户已存在，密码输入错误',
					})
				}else{
					req.session.admin_id = admin.id;
					res.send({
						status:1,
						success:'登录成功',
					})
				}
			}catch(err){
				res.send({
					status:0,
					type:'LOGIN_ADMIN_FAILED',
					message:'登录管理员失败',
				})
			}
		})
	}
}

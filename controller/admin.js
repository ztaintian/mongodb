import AdminModdel from '../models/admin';

class Admin extends AddressComponent {
	constructor(){
		super()
		this.login = this.login.bind(this)
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
			const {useNa用户名me,password,status=1} = fields;
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
}

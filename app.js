import express from 'express'
import config from 'config-lite'
const app = express();
console.log(config.url)
// const port = '3000';
app.get('/', function(req, res){
  res.send('hello world');
});
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

app.listen(3000,() =>{
	// console.log(`listen on port ${port}`)
})

// kk
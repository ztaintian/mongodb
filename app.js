import express from 'express';
import config from 'config';
import './mongodb/db.js';
import winston from 'winston';//Winston是Node.js最流行的日志框架之一
import expressWinston from 'express-winston';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import router from './router/index';
const app = express();

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

const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	  	name: config.session.name,
		secret: config.session.secret,
		resave: true,
		saveUninitialized: false,
		cookie: config.session.cookie,
		store: new MongoStore({
	  	url: config.url
	})
}))

router(app);
//日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/success.log'
        })
    ]
}));


app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/error.log'
        })
    ]
}));

app.use((err, req, res, next) => {
  res.status(404).send('未找到当前路由');
});
app.listen(config.port,() =>{
	console.log(`listen on port ${config.port}`)
})

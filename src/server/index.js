const express =require( 'express')
const dotenv =require( 'dotenv')
const Connection =require('./database/db.js')
const Routes =require( './routes/route.js')
const cors =require( 'cors')
const bodyParser =require( 'body-parser')
const session =require( "express-session")
const MongoStore =require( 'connect-mongo')

const app = express()

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true); //this is you are missing
  next();
});

app.use(cors({
  origin:["http://localhost:3000"],
  methods: ['GET', 'POST','PUT','DELETE'],
  credentials:true,
  allowedHeaders: ['Content-Type'],

}));

app.use(bodyParser.json({ extended: true })); 
app.use(bodyParser.urlencoded({ extended: true })) 



app.set('trust proxy', 1) // trust first proxy
app.use(session({  
  name: `SecretSession`,
  store:MongoStore.create({
    mongoUrl:"mongodb://localhost:27017/react-lp-bkp",
    // clientPromise,
    dbName:"react-lp-bkp",
    ttl:600000,
    touchAfter: 24 * 60* 3600, // time period i n seconds,
    

  }),
  secret: 'mysession',        
  resave: false,
  saveUninitialized: true,
  // httpOnly: false,
  // samesite:"strict",
  cookie: { 
    secure: false,
    maxAge: 60000 // 1 min
  }   
}));

app.use("", Routes) 



const PORT = 8000

app.listen(PORT, () => {
    console.log(`Express server is running at port ${PORT}`);
})



dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD
Connection(username, password);

module.exports=app;
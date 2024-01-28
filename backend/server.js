const express= require('express')
const mysql=require('mysql')
const mssql=require('mssql')
const cors=require('cors')

const app=express();
app.use(cors());
app.use(express.json());

app.post('/signup',(req,res)=>{
    
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    const sql="INSERT INTO [LoginDemo].[dbo].[Persons] (name,email,password) VALUES ('"+values[0]+"','"+values[1]+"','"+values[2]+"')";
    console.log(sql)
    const dbConnect = async() =>{
        var config = {
    
            server: 'localhost\\SQLEXPRESS',
            database: 'LoginDemo',
            port:1433,
            user: 'eamil',
            password: '321',
            trustServerCertificate:true,
            options: {
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1',
                    trustServerCertificate: true,
                }
            }
        }
    
        try {
            await mssql.connect(config)
            const result= await mssql.query(sql)
            
           console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    
    dbConnect()
    // db.query(sql,[values],(err,data)=>{
    //     if(err){
    //         console.log('comming');
    //         return res.json("Error");
    //     }
    //    // console.log('comming');
    //     return res.json(data);
    // })
})

app.post('/login',(req,res)=>{
    
    const values=[
        req.body.email,
        req.body.password
    ]
    const sql="SELECT email,password FROM [LoginDemo].[dbo].[Persons] WHERE email='"+values[0]+"' AND password='"+ values[1]+"'";
    console.log(sql)
    const dbConnect = async() =>{
        var config = {
    
            server: 'localhost\\SQLEXPRESS',
            database: 'LoginDemo',
            port:1433,
            user: 'eamil',
            password: '321',
            trustServerCertificate:true,
            options: {
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1',
                    trustServerCertificate: true,
                }
            }
        }
    
        try {
            await mssql.connect(config)
            const result= await mssql.query(sql)
            var rows=result.rowsAffected[0]
            if (rows>0){
                   
                return res.json("success")
            }

            else {
                return res.json("failed")
            }
           console.log(result.rowsAffected[0]);
        } catch (error) {
            console.log(error);
        }
    }
    
    dbConnect()
    // db.query(sql,[values],(err,data)=>{
    //     if(err){
    //         console.log('comming');
    //         return res.json("Error");
    //     }
    //    // console.log('comming');
    //     return res.json(data);
    // })
})


app.listen(8081,()=>{
    console.log('Listening')
})
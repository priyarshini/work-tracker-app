import db from "../connection/sqliteDB.js"
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import {userInsert, usersSelectAll, userSelectByEmail, userSelectById} from "../repository/userRepository.js"
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res)=>{
    const input = {...req.body}
   

    if (input.name == undefined || input.email == undefined || input.password == undefined)
        {return res.status(400).json({success: false, msg:'Please provide username, email ID and password'})};
    const hashedPassword = await hashPassword(input.password);

    console.log("came to insert")
    db.serialize(function() {

    db.all(userSelectByEmail,[input.email],  async function(err, row) {
    if (err) {
      return console.log(err.message);
    }
    if(row != undefined && row.length >=1) {
      console.log("return" +row)
      return res.status(400).json({success: false, msg:`user already exist with mail ID ${input.email}!`});
    }
      console.log(row)
      db.run(userInsert, [input.name, input.email, hashedPassword],  (err)=> {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid `);
        return res.status(200).json({ success: true, msg: 'New user has been created successfully!' });
      });

    
  })
})
  
}

export const login = async (req, res)=>{

    const input = {...req.body};

    console.log("came to login")
    db.all(userSelectByEmail,[input.email], async function(err,row) {
      if(row.length>0){
        row = row[0]
      }
      if (err || row.hashPassword == undefined) {
        console.log(err, row);
        return res.status(403).json({ success: false, msg: `Account doesn't exist!`});
      }
      console.log("Account exist! ",row)
      console.log(row.hashPassword)
      const validatePassword =  await comparePassword(input.password, row.hashPassword)
      if (!validatePassword) return res.status(403).json({ success: false, msg: `Invalid Credentials`});
      else {  
        const token = createJWT({ userId: row.id});

      const oneDay = 1000 * 60 * 60 * 24;
    
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
      });
    }


    res.status(200).json({ success: true, msg: `User ${row.name} logged in`, data: row });

    });
    
   
    

}

export const getAllUsers = async (req, res)=>{
  db.all(usersSelectAll, function (err, rows) {
      if (err) {
          return console.log(err.message);
      }
      console.log(`row ${rows}`);
      return res.status(200).json({ success: true, data: rows });
  });
  

}

export const getCurrentUser = async (req, res) => {
  console.log("user ID "+(JSON.stringify(req.user.userId)))
  db.all(userSelectById, [req.user.userId], function (err, rows) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`row ${rows}`);
      return res.status(200).json({ success: true, data: rows });
      
    });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: 'User logged out!' });
};

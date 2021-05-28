/**
 * INFORMATION CONTROLLER
 * 
 * This controller is for properties related to user information
 */

 const db = require("../../models");
 const User = db.Users;
 
 
 // Return the information of the representative
 exports.getInfo = (req, res, next) => {
     if(req.user.user_ID === 'Representative') {
             const id = req.user.user_ID;
             console.log(id)
           
             User.findByPk(id)
               .then((data) => {
                 res.send({
                   error: false,
                   data: data,
                   message: ['[Representative] record retrieves successfully'],
                 });
             })
                 .catch((err) => {
                 res.status(500).send({
                   error: true,
                   data: [],
                   message:
                     err.errors.map((e) => e.message),
                 });
             });
     } else {
         res.sendStatus(403);
     }
 }
 
 exports.updateInfo = (req, res) => {
     const id = req.params.id;
 
 // update the information of the Representative
     User.update_info(req.body, {
         where : { user_ID : id }
     }).then((result) => {
         console.log(result);
         if (result){
             // success
             User.findByPk(id).then((data) => {
                 res.send({
                     error : false,
                     data : data,
                     message : 'Representative record has been updated.',
                 });
             });
         } else {
             // error in updating
             res.status(500).send({
                 error: true,
                 data: [],
                 message: ["Error in updating a record"],
             });
         }
     })
 }
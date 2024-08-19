import db from "../connection/sqliteDB.js"
import {taskSelectAll, taskSelectById, taskInsert, taskUpdate, taskDelete} from "../repository/taskRepository.js"

const defaultStatus = ["pending", "in progress","completed"];

export const addTask = async (req, res)=>{
    const title = req.body.title
    const description =  req.body.description;
    const userId = req.user.userId;
    console.log("add for userId",userId)

    if (title == undefined || description == undefined || userId == undefined)
        {return res.status(400).json({success: false, msg:'Please provide task title, description and status'})};
    
    db.run(taskInsert, [title, description, userId], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        return res.status(200).json({success: true, msg:'New Task has been added successfully!'});
      });

}

export const editTask = async (req, res)=>{
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;

    if (!title || !description || !status)
        return res.status(200).json({success: false, msg:'Please provide task, title, status and description'});
    if (!defaultStatus.includes(status))
        return res.status(200).json({success: false, msg:'Please provide correct status'});
    db.run(taskUpdate, [title, description, status, id], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been updated with rowid ${this.lastID}`);
        return res.status(200).json({success: true, msg:'Task has been updated successfully!'});
      });
    

}

export const getTasksById = async (req, res)=>{
    const id = req.params.id;
    if (!id)
        return res.status(200).json({success: false, msg:'Please provide user id'});
    
    db.all(taskSelectById, [id], function(err,rows) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`row ${rows}`);
        return res.status(200).json({success: true, data: rows} );
      });
    

}

export const getAllTasks = async (req, res)=>{
    db.all(taskSelectAll, function (err, rows) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`row ${rows}`);
        return res.status(200).json({ success: true, data: rows });
    });
    

}

export const removeTask = async (req, res)=>{
    const id = req.params.id;
    if (!id)
        return res.status(200).json({success: false, msg:'Please provide task id'});
    db.run(taskDelete,[id], function(err,rows) {
        if (err) {
          return console.log(err.message);
        }
        return res.status(200).json({success: true, msg:'Task has been deleted successfully!'} );
      });


}

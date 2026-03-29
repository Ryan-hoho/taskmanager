const Task =require('../models/Task');

const getTasks = async (requestAnimationFrame,res) =>{
try {

const tasks= await Task.find({ userId: requestAnimationFrame.user.Id });
res.json(tasks);

} catch(error){
res.status(500).json({ message: error.message});
}

};
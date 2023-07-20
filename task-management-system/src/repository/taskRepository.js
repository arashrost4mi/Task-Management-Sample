import Task from "../models/taskModel.js";

class TaskRepository {
    async create(taskData){
        const task = new Task(taskData);
        return await task.save();
    }

    async getAll(){
        return await Task.find();
    }

    async getById(id){
        return await Task.findById(id);
    }

    async update(id, updatedData){
        return await Task.findByIdAndUpdate(id, updatedData, {new: true});
    }

    async delete(id){
        return await Task.findByIdAndDelete(id);
    }
}

export default TaskRepository;
import User from "../models/userModel.js";

class UserRepository{
    async create(userData){
        const user = new User(userData);
        return await user.save();
    }

    async getAll(){
        return await User.find();
    }

    async getById(id){
        return await User.findById(id);
    }

    async getByUsername(username){
        return await User.findOne({ username });
    }

    async update(id, updatedData){
        return await User.findByIdAndUpdate(id, updatedData, {new: true});
    }

    async delete(id){
        return await User.findByIdAndDelete(id);
    }
}

export default UserRepository;
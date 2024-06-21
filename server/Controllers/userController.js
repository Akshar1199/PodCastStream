const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");


const updateUserController = async (req, res) => {
    try {
        const { name, email, password, image } = req.body;

        console.log(name, email, password, image);

        const existingUser = await UserModel.findById(req.params.id);
        if (!existingUser) {
            return res.status(404).send({
                message: "User not found",
                success: false
            });
        }
        existingUser.name = name || existingUser.name;
        existingUser.email = email || existingUser.email;
        existingUser.image = image || existingUser.image;

        console.log(existingUser);

        if (password) {
            const salt = await bcrypt.genSalt(10);
            existingUser.password = await bcrypt.hash(password, salt);
        }

        console.log(existingUser);

        const updatedUser = await existingUser.save({ validateBeforeSave: true });

        const { password: removedPassword, ...userWithoutPassword } = updatedUser.toObject();

        return res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error in updating",
            error
        });
    }
}

const emailExistenceController = async (req, res) => {
    const { email } = req.body;
    console.log('email:', email);
    try {
        const user = await UserModel.findOne({ email });
        console.log('user:', user);
        if (user) {
            res.status(400).json({ isRegistered: true });
        } else {
            res.status(200).json({ isRegistered: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

const userDataController = async (req, res, next) => {
    try {

        const user = await UserModel.findById(req.params.id)
            .populate({
                path: 'podcasts',
                model: 'PodcastModel', 
                populate: {
                    path: 'creator',
                    model: 'UserModel', 
                    select: 'name image'
                }
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = { updateUserController, emailExistenceController, userDataController }
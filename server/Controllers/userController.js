const UserModel = require("../Models/UserModel");

const updateUserController = async (req, res) => {
    try {
        const {name, email} = req.body;
        console.log(name, email);
        const existingUser = await UserModel.findById(req.params.id);
        if (!existingUser) {
            return res.status(404).send({
                message: "User not found",
                success: false
            });
        }
        existingUser.name = name || existingUser.name;
        existingUser.email = email || existingUser.email;

        console.log(existingUser);

        const updatedUser = await existingUser.save({ validateBeforeSave: true });
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error in updating",
            error
        })
    }
}

module.exports = { updateUserController }
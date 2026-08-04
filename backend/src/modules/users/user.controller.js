import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import userService from "./user.service.js";


const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);

    return successResponse(
        res,
        user,
        "User created successfully",
        201
    )
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

    return successResponse(
        res,
        users,
        "users fetched successfully",
    )
})

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    return successResponse(
        res,
        user,
        "user fetched successfully"
    )
})

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedUser = await userService.updateUser(
        id,
        req.body
    )

    return successResponse(
        res,
        updatedUser,
        "user updated successfully"
    )
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await userService.deleteUser(id);

    return successResponse(
        res,
        null,
        "user deleted successfully"
    )
})


const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}


export default userController;
import { successResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import dashboardService from "./dashboard.service.js";



const getAdminDashboard = asyncHandler(async(req,res)=>{
    const dashboard = await dashboardService.getAdminDashboard();

    return successResponse(
        res,
        dashboard,
        "Admin dashboard fetched successfully"
    )
})

const dashboardController = {
    getAdminDashboard,
}

export default dashboardController;
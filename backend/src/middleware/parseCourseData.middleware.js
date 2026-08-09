const parseCourseData = (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Request body is required",
            });
        }

        if (typeof req.body.syllabus === "string") {
            req.body.syllabus = JSON.parse(req.body.syllabus);
        }

        if (typeof req.body.prerequisites === "string") {
            req.body.prerequisites = JSON.parse(req.body.prerequisites);
        }

        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid syllabus or prerequisites format",
        });
    }
};

export default parseCourseData;
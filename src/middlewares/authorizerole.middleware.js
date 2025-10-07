/**
 * Middleware to restrict route access based on user role
 * @param {...string} allowedRoles - Roles allowed to access the route
 * Example: authorizeRole('superadmin', 'admin')
 */

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // Check if authentication middleware attached req.user
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: No user info found'
                });
            }

            const userRole = req.user.role;

            // If role not allowed, reject access
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: `Access denied: ${userRole} not authorized`
                });
            }

            // Role is allowed — proceed to controller
            next();
        } catch (error) {
            console.error('authorizeRole error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error during role authorization'
            });
        }
    };
};

export default authorizeRole;

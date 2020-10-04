const userRoutes = require("./userRoutes");

const useRoutes = app => {
    // user
    app.use('/api/users',userRoutes);
}

module.exports = useRoutes;
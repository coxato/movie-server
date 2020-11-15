const userRoutes = require("./userRoutes");
const validationRoutes = require("./validationRoutes");
const commentsRoutes = require("./commentsRoutes");
// mock routes, only use in development
// const mockRoutes = require("./mockRoutes");

const useRoutes = app => {
    // user 
    app.use('/api/users', userRoutes);
    app.use('/api/validate', validationRoutes);
    app.use('/api/comments', commentsRoutes);
    // app.use('/api/mocks', mockRoutes);
}

module.exports = useRoutes;
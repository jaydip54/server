const express = require("express");
const routes = express.Router();
const CityRoutes = require('./city.routes')
const areaRoutes = require('./area.routes')
const userRoutes = require('./user.routes')
const authRoutes = require('./auth.routes')
const categoryRoutes = require('./category.routes')
const lhRoutes = require('./loginHistory.routes')
const feedbackRoutes = require('./feedback.routes')
const emailSubRoutes = require('./emailSub.routes')
const packageRoutes = require("./package.routes");
const pspaceRoutes = require("./parkingspace.routes");








routes.use('/city', CityRoutes)
routes.use('/area', areaRoutes)
routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/category', categoryRoutes)

routes.use('/lh', lhRoutes)
routes.use('/emailsub', emailSubRoutes)
routes.use('/feedback', feedbackRoutes)
routes.use('/package', packageRoutes)
routes.use('/pspace', pspaceRoutes)
module.exports = routes;

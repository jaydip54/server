const express = require("express");
const routes = express.Router();
const CityRoutes = require('./city.routes')
const areaRoutes = require('./area.routes')
const userRoutes = require('./user.routes')
const authRoutes = require('./auth.routes')
routes.use('/city', CityRoutes)
routes.use('/area', areaRoutes)
routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
module.exports = routes;

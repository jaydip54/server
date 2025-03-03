const express = require("express");
const routes = express.Router();
const CityRoutes = require('./city.routes')
const areaRoutes = require('./area.routes')
const userRoutes = require('./user.routes')
const authRoutes = require('./auth.routes')
const categoryRoutes = require('./category.routes');
const { isLogin, isRestrict } = require("../middleware/auth");
const lhRoutes = require('./loginHistory.routes')
const feedbackRoutes = require('./feedback.routes')
const emailSubRoutes = require('./emailSub.routes')
const packageRoutes = require("./package.routes");
const pspaceRoutes = require("./parkingspace.routes");
const vehicleRoutes = require("./vehicle.routes");
const bussinesPlaceRegister = require('./bussinesPlace.routes')
const assign = require('./parkingSpaceAssign.routes')
const capacity = require('./capacity.routes')
const bankRoutes = require("../source/bank");
const booking = require('../source/booking')
const bill = require('../source/bill')
const cancelBokking = require('../source/cancelbooking')
const ratingRoutes = require('../source/rating')

routes.use('/city', CityRoutes)
routes.use('/area', areaRoutes)
routes.use('/user', userRoutes)
routes.use('/auth', authRoutes)
routes.use('/category', isLogin, isRestrict([1]), categoryRoutes)
routes.use('/lh', isLogin, isRestrict([0, 1, 2, 3]), lhRoutes)
routes.use('/emailsub', emailSubRoutes)
routes.use('/feedback', isLogin, isRestrict([0, 1, 2, 3]), feedbackRoutes)
routes.use('/package', packageRoutes)
routes.use('/pspace', pspaceRoutes)



routes.use('/vehicle', isLogin, isRestrict([0, 1, 2]), vehicleRoutes)
routes.use('/bussinesPlace', isLogin, isRestrict([0, 1, 2]), bussinesPlaceRegister)

routes.use('/assign', isLogin, isRestrict([0, 1, 2]), assign)
routes.use('/capacity', isLogin, isRestrict([0, 1, 2]), capacity)
routes.use('/bank', isLogin, bankRoutes)
routes.use('/book', isLogin, isRestrict([0, 1, 2]), booking)
routes.use('/bill', isLogin, isRestrict([0, 1, 2]), bill)
routes.use('/cancel', isLogin, isRestrict([0, 1, 2]), cancelBokking)
routes.use('/rating', isLogin, isRestrict([0, 1, 2]), ratingRoutes)

module.exports = routes;

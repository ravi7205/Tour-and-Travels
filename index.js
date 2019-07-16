const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const port = 80;
const db_ops = require('./routes/db_ops');
const auth = require('./routes/authentication/auth');
const jwt = require('jsonwebtoken');

app.use(express.static('./public'));
const router = express.Router();
const sessionRouter = express.Router();
app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));



router.get('/delete/location/:lname', db_ops.deleteLocation);
router.post('/add/location', db_ops.addlocation);
router.get('/search/location', db_ops.getLocation);

router.get('/search/user', auth.verifyToken, db_ops.searchUser);
router.get('/search/hotels/', db_ops.getHotels);

router.post('/add/user', db_ops.addUser);

router.post('/add/flight', db_ops.addFlight);
router.post('/search/flight', db_ops.getFlights);

router.post('/add/hotel', db_ops.addHotel);
router.post('/add/hotel/photo', db_ops.addHotelPhoto);
router.post('/add/hotel/reviews', db_ops.addHotelReview);
router.post('/search/hotel',db_ops.getHotels);

router.post('/add/package', db_ops.addPackage);
router.post('/add/package/info', db_ops.addPackageTravelInfo);
router.post('/add/package/hotel', db_ops.addPackageHotels);
router.post('/add/package/sight_seeing', db_ops.addPackageSightSeeing);



sessionRouter.get('/verify', auth.verifyToken, db_ops.verifyUser);
sessionRouter.post('/login', auth.login);
app.use('/api', router);
app.use('/', sessionRouter);




app.listen(port, '172.19.15.95',() => {
    console.log('Listening on port ' + port);
});

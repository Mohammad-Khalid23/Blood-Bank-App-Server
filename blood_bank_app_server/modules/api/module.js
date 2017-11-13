var express = require('express');
var router = express.Router();
var auth = require("./authentication/auth")
var bloodBank = require('./bloodbanks/bloodBank')
var donors = require('./donors/donor')
var recievers = require('./reciever/reciever')
var admins = require('./admin/admin')


router.get('/', auth.home);
/**blood bank request handlers**/
router.get('/admins', admins.getAdmins);
router.post('/addAdmin', admins.addAdmin);
router.delete('/deleteAdmin/:_aId', admins.deleteAdmin);
/**blood bank request handlers**/
router.get('/bloodBanks', bloodBank.allBloodBanks);
router.post('/addBloodBank', bloodBank.addBloodBanks);
router.delete('/deleteBloodBank/:_bId', bloodBank.deleteBloodBank);
/**blood donor request handlers**/
router.get('/donors', donors.getDonor);
router.post('/addDonor', donors.addDonor);
router.delete('/deleteDonor/:_dId', donors.deleteDonor);
/**blood reciever request handlers**/
router.get('/recievers', recievers.getReciever);
router.post('/addReciever', recievers.addReciever);
router.delete('/deleteReciever/:_rId', recievers.deleteReciever);
/**signup login request handlers**/
router.post('/signup', auth.signup);
router.post('/login', auth.login);



module.exports = router;

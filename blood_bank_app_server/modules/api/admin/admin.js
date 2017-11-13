const mongoose = require('mongoose');
var constants = require("../../../config/constants");
var requestHelper = require("../../../helpers/request");
var responseHelper = require("../../../helpers/response");

var admins = {
    title: "Blood Admin",
    statusCode: constants.HTTP.CODES.SUCCESS
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://patient-tracker2:patient123@ds139984.mlab.com:39984/khalid-projects', { useMongoClient: true });


//user scheme
var adminSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    bloodBank: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }

}, { collection: "admins" });

var model = mongoose.model("admins", adminSchema);


admins.addAdmin = function (req, res) {
    var postBody = requestHelper.parseBody(req.body);
    console.log(postBody)
    res.send(postBody)
    var Admin = {
        name: postBody.name,
        email: postBody.email,
        userId: postBody.userId,
        bloodBank: postBody.bloodBank,
        contactNumber: postBody.contactNumber,
        address: postBody.address
    }
    addadmin(Admin, function (err, data) {
        if (err) {
            console.log(err)
        }
        res.json(Admin)
    })
    res.send("succesefully user has been added in Database");
}
//get admin
admins.getAdmins = function (req, res) {
    getadmin()
    console.log(req)
    res.send("got all admin in console");
}



//delet blood bank
admins.deleteAdmin =
    function (req, res) {
        var postBody = requestHelper.parseBody(req.body);
        res.send(postBody)
        var id = postBody._id.$oid;
        model.findByIdAndRemove(id, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
                console.log(constants.HTTP.CODES.SUCCESS)
            }
        })
    }








//add Admin funtion
function addadmin(data, callback) {
    var saveData = new model(data);

    saveData.save((err, dat) => {
        if (err) {
            console.error(err, "err")
        }
        else {
            console.log(dat, "data")
        }
    });
}

//get Admin funtion
function getadmin(data, callback) {
    model.find(function (err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data, "data admin")
    })
}
module.exports = admins;
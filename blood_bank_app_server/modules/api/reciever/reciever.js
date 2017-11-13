const mongoose = require('mongoose');
var constants = require("../../../config/constants");
var requestHelper = require("../../../helpers/request");
var responseHelper = require("../../../helpers/response");

var recievers = {
    title: "Blood reciever",
    statusCode: constants.HTTP.CODES.SUCCESS
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://patient-tracker2:patient123@ds139984.mlab.com:39984/khalid-projects', { useMongoClient: true });


//user scheme
var recieverSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type : String,
        required : true
    },
    bloodGroup: {
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

}, { collection: "recievers" });

var model = mongoose.model("recievers", recieverSchema);


recievers.addReciever = function (req, res) {
    var postBody = requestHelper.parseBody(req.body);
    console.log(postBody)
    res.send(postBody)
    var reciever = {
        name: postBody.name,
        email: postBody.email,
        userId: postBody.userId,
        bloodGroup: postBody.bloodGroup,
        contactNumber: postBody.contactNumber,
        address: postBody.address
    }
    addrecievers(reciever, function (err, data) {
        if (err) {
            console.log(err)
        }
        res.json(reciever)
    })
    res.send("succesefully user has been added in Database");
}
//get recievers
recievers.getReciever = function (req, res) {
    getrecievers()
    console.log(req)
    res.send("got all recievers in console");
}



//delet blood bank
recievers.deleteReciever =
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








//add reciever funtion
function addrecievers(data, callback) {
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

//get reciever funtion
function getrecievers(data, callback) {
    model.find(function (err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data, "data reciever")
    })
}
module.exports = recievers;
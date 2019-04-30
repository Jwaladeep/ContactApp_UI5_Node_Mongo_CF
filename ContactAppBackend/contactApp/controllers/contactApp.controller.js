const Contact = require('../models/contactApp.model'); //importing model from models/product

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('TEsting here again from the Test controller!');
};

// controllers/products.js
//create new collection
exports.contactApp_create = function (req, res) {
    let contact = new Contact(
        {
            name: req.body.Name,				//initialising object with values from payload
            phone: req.body.Phone
        }
    );

    contact.save(function (err) {
        if (err) {								//obj.save equivalent to post call.
            return next(err);
        }
        res.send('Contact Created successfully') //res.send --> writes response back to client
    })
};
//find by Id
exports.contactApp_details = function (req, res) {
   /* var oldphone= {'Phone': req.oldPhone};
    var newData= {'Name': req.Name,
                  'Phone':req.Phone};*/
    Contact.findById(req.params.id, function (err, contact) { 
        if (err) return next(err);
        res.send(contact);
    });
};
//update by phone
exports.contactApp_update = function (req, res) {
    var oldphone= {'phone': req.body.oldPhone};
    var newData= {'name': req.body.Name,
                  'phone':req.body.Phone};
    Contact.findOneAndUpdate(oldphone, newData, {upsert:true}, function (err, contact)
    /*Contact.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, contact) */{
        if (err) return next(err);
        res.send('Contact: ' + contact +' udpated.');
    });
};
//delete by Id
exports.contactApp_delete = function (req, res) {
    Contact.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
//update by Id
exports.contactApp_updateById = function (req, res) {
    
   /* Contact.findOneAndUpdate(oldphone, newData, {upsert:true}, function (err, contact)*/
    Contact.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, contact) {
        if (err) return next(err);
        res.send('Contact: ' + contact +' udpated.');
    });
};


//delete by phone
exports.contactApp_deleteMany = function (req, res) {
    var toDelArr =req.body.Phone;
    console.log(toDelArr);
    
  Contact.deleteMany({phone: { $in: toDelArr} }, function (err) {
      if (err) return next(err);
        res.send('Deleted successfully!');
  });
};

//get all
exports.contactApp_getAll= function(req,res){
	Contact.find(function(err,contact){if(err) return next(err);
	res.send(contact);
})};
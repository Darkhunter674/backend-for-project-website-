const userModel = require('./usermodel');

module.exports.createUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        var userModelData = new userModel(userDetails);

        userModelData.save()
            .then(result => {
                console.log(result);
                resolve(true); // Resolve the promise with true indicating success
            })
            .catch(err => {
                console.error(err);
                resolve(false); // Resolve the promise with false indicating failure
            });
    });
}

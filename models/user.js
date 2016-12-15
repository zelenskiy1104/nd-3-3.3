const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String
});

exports.create = function(name, done) {
    let User = mongoose.model('User', userSchema);
    let item = new User({name: name});
    item.save();
    done(item._id);
}

exports.get = function(id, done) {
    let User = mongoose.model('User', userSchema);
    User.find({_id: id}, (err, result) => done(result[0]));
}

exports.list = function(done) {
    let User = mongoose.model('User', userSchema);
    User.find({}, (err, result) => done(result));
}

exports.update = function(id, fields, done) {
    let User = mongoose.model('User', userSchema);
    User.update({_id: id}, fields, () => {
        done(this);
    });
}

exports.delete = function(id, done) {
    let User = mongoose.model('User', userSchema);
    User.remove({_id: id}, (err, result) => done(result));
}

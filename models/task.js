const Schema = mongoose.Schema;
const taskSchema = new Schema({
    title: String,
    description: String,
    status: String,
    user: String
});

exports.get = function(id, done) {
    let Task = mongoose.model('Task', taskSchema);
    Task.find({_id: id}, (err, result) => done(result[0]));
}

exports.list = function(done) {
    let Task = mongoose.model('Task', taskSchema);
    Task.find({}, (err, result) => done(result));
}

exports.search = function(string, done) {
    let Task = mongoose.model('Task', taskSchema);
    Task.find({$or: [{title: new RegExp(string, 'i')}, {description: new RegExp(string, 'i')}]}, (err, result) => done(result));
}

exports.update = function(id, fields, done) {
    let Task = mongoose.model('Task', taskSchema);
    Task.update({_id: id}, fields, () => {
        done(this);
    });
}

exports.create = function(title, description, status, user, done) {
    let Task = mongoose.model('Task', taskSchema);
    let item = new Task({title: title, description: description, status: status, user: user});
    item.save();
    done(item._id);
}

exports.delete = function(id, done) {
    let Task = mongoose.model('Task', taskSchema);
    Task.remove({_id: id}, (err, result) => done(result));
}

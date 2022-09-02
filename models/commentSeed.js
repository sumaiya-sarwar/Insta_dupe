const db = require('./index')
const comments = [{

    user: '6310ed90150cbc379506785d',
    context: 'hello'
}]

async function reloadData() {
    try {
        //let deleted = await db.User.deleteMany({});
        let deletedComments = await db.Comments.deleteMany({});
        //console.log(deleted, deletedPosts);
        // console.log(deleted);
        //let reloading = await db.User.insertMany(users);
        let reloadComments = await db.Comments.insertMany(comments);
        //console.log(reloading, reloadPosts);
    } catch (err) {
        console.log(err);
    }
}

reloadData();
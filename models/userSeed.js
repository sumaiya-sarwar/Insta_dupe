const db = require('./index')
const users = [
    {
        name: 'Sean Buchas',
        image: 'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
        followers: 9000,
        posts: [],
        following: 5000,
        password: 'apples',
        bio: 'Currently in a bootcamp to become a softare engineer!'

    },
    {
        name: 'Sumaiya Sarwar',
        image: 'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
        followers: 10000,
        posts: [],
        following: 6000,
        password: 'oranges',
        bio: 'Software engineering student!'

    },
    {
        name: 'Manases Lopez',
        image: 'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
        followers: 11000,
        posts: [],
        following: 7000,
        password: 'grape',
        bio: 'Studying to become a softare engineer!!'

    }

];

async function reloadData() {
    try {
        let deleted = await db.User.deleteMany({});
        console.log(deleted)
        // console.log(deleted);
        let reloading = await db.User.insertMany(users);
        console.log(reloading)
    } catch (err) {
        console.log(err);
    }
}

reloadData();
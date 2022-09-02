const db = require('./index')
const users = [
    {
        username: 'SBuchas',
        name: 'Sean Buchas',
        image: 'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
        followers: 9000,
        posts: [],
        following: 5000,
        password: 'apples',
        bio: 'Currently in a bootcamp to become a softare engineer!'
        

    },
    {
        username: 'SSarwar',
        name: 'Sumaiya Sarwar',
        image: 'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
        followers: 10000,
        posts: [],
        following: 6000,
        password: 'oranges',
        bio: 'Software engineering student!'

    },
    {
        username: 'MLopez',
        name: 'Manases Lopez',
        image: 'https://cdn.shopify.com/s/files/1/1297/1509/products/hero1_6de889fb-b540-49e4-b733-3af0baaa7f63_x1440.jpg?v=1571274629',
        followers: 11000,
        posts: [],
        following: 7000,
        password: 'grape',
        bio: 'Studying to become a softare engineer!!'

    }

];

const posts = [
    {
        image: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88',
        likes: 5,
        user: '630e1f32c48acac791badf53',
        comments: []
    },
    {
        image: 'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',
        likes: 88,
        user: '630e1f32c48acac791badf53',
        comments: []
    },
]

async function reloadData() {
    try {
        //let deleted = await db.User.deleteMany({});
        let deletedPosts = await db.Posts.deleteMany({});
        //console.log(deleted, deletedPosts);
        // console.log(deleted);
        //let reloading = await db.User.insertMany(users);
        let reloadPosts = await db.Posts.insertMany(posts);
        //console.log(reloading, reloadPosts);
    } catch (err) {
        console.log(err);
    }
}

reloadData();
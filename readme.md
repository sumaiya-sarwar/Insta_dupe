# Sean Buchas, Sumaiya Saraw, Manases Elias Lopez Gill | SEI Project 2 | Insta Dupe

---

## Project Description
---

This is a group project where we reversed engineered version of the popular social media site Instagram. Users are able to register for an account using a unique username and a password that is hashed encrypted. Users are able to then login to their account. Once logged in users are able to make a post. Making a post consists of uploading a picture from their computer and adding a caption. Their post will then appear in a global feed which everyone part of the site can view and comment on. In order to make a comment on a post you can click on the image which brings you to a show page of the post which displays the post and any comments the post may have. Users have the option to create a comment on the bottom of the post. Once the comment is made users can edit or delete the comment. Users can also edit the caption on their posts or delete their posts outright.

## Technologies Used
---
**HTML** makes up the bulk of the app. We used HTML to display posts and create forms for users to create posts and comments. 

**CSS** was used to style our app to make it look similar to Instagram. 

**Express** was used for our server and routing. We have 3 separate controllers to handel all the routing required for our app.

**EJS** was used to create all of our pages that users interact with. We implemented **Javascript** in our EJS files to process through data which needs to be displayed to the user. 

**MongoDB/Mongoose** were used to store our data through schemas we defined. We use 3 different schemas for this app and all the data is stored with MongoDB.

## Screenshots
---

## Whats Next
--
We can continue to add features to make it even more like Instagram. We can implement a like button as well as adding functionality to create followers and being able to follow other accounts. We can update the feed to only display posts from people you follow. Comments can be moved from their own page and instead incorporated into the feed.
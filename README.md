# Vue-and-Mongo-Todo-App
Your simple to-do app made with Vue.js and MongoDB.

You can view the code here, however the preview wouldn't work, because I changed the secret that's needed to access the database.
The reson is simple - I want to have some control over what people see when they look at the task list
and I couldn't have it if anybody on internet was allowed to add any task they want :-)

So you can see how to make this app, but you can't see it work. BUT I've made a simple version without database that you can use and add tasks to and delete them,
but because it has no DB, your changes are gone when you refresh the page or leave the website. 

So this way, you can both try the app and see the proper code :-)

You can find the working version here - https://to-do-app-vue-no-mongo.vercel.app/

If you want to make similar app yourself using this code, it should work just fine, the only thing you need to do is replace the urls for your own.
You simply need to login to you mongodb account, set a database with a collection, go to realm and make API webhooks.
It may not sound simple, so here is (not mine) video (https://www.youtube.com/watch?v=bM3fcw4M-yk&t=3s) to help you do just that!

I had to wrote my own webhooks. They're far from perfect, but they work. Feel free to use your own, but if you just want working app,
you can use mine and they will work with my code if you just copy it and replace the urls.

I added a .txt file with all the webhooks. Just copy and paste them into your mongo account.
Keep in mind that I've made separate webhook for each get, put (add tasks) and delete. So you'd have three different urls and three different webhooks.
Or make them one, do it your way! ;-) My code just works with three that's all.

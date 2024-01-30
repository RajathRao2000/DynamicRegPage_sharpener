let posts = ["post 1", "post 2", "post 3"];
let date = new Date();
let currentDate = date.toLocaleDateString();
let currentTime = date.toLocaleTimeString();
let userLastActTime = currentDate + " " + currentTime;

const user = {
  name: "rajath",
  userLastActTime: userLastActTime,
};

console.log("user last activity time: " + user.userLastActTime);

async function updateLastUserActivityTime() {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      currentDate = new Date().toLocaleDateString();

      currentTime = new Date().toLocaleTimeString();

      user.userLastActTime = currentDate + " " + currentTime;

      resolve("user current activity time: " + user.userLastActTime);
    }, 1000);
  });
}

async function createPost() {
  return await new Promise((resolve, reject) => {
    console.log("Adding Post...");

    posts.push("Post 4");

    resolve("Added post");
  });
}




Promise.all([createPost(), updateLastUserActivityTime()]).then((res) => {
  res.forEach((output) => console.log(output));

  console.log("post list: ");

  posts.forEach((ele) => console.log(ele));

  deletePost().then((res) => {
    console.log(res);

    console.log("\nPost list: ");

    if (posts.length == 0) {
      console.log("no posts");
    } else {
      posts.forEach((ele) => console.log(ele));
    }
  });
});

async function deletePost() {
  return await new Promise((resolve, reject) => {
    console.log("\ndeleting post....");

    resolve("Post deleted, Post name: " + posts.pop());
  });
}

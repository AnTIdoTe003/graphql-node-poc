export interface Post {
  post_id: string;
  post_title: string;
  user_id: string;
}

export interface User {
  user_id: string;
  name: string;
  country: string;
  posts: Post[];
}

const users: User[] = [];

for (let i = 1; i <= 10; i++) {
  const user: User = {
    user_id: `${i}`,
    name: `User ${i}`,
    country: `Country ${i}`,
    posts: [
      { post_id: `${i}01`, post_title: `Post ${i}01`, user_id: `${i}` },
      { post_id: `${i}02`, post_title: `Post ${i}02`, user_id: `${i}` },
    ],
  };

  users.push(user);
}

export default users;

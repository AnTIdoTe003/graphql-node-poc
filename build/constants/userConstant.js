"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [];
for (let i = 1; i <= 10; i++) {
    const user = {
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
exports.default = users;

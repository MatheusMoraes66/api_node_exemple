const { Router } = require("express");
const fetch = require("node-fetch");
const router = Router();

router.get('/', async (req, res) => {
    const respost = await fetch("http://jsonplaceholder.typicode.com/posts");
    const post = await respost.json();
    res.json(post);
});

module.exports = router;
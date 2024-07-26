const {Router} = require('express');

const {createBlog,getAddNew,getBlogById,createComment,upload} = require('../controllers/blog-controller');
const router = Router();

router.get('/add-new', getAddNew);
router.get('/:id', getBlogById);
router.post("/", upload.single('coverImage'), createBlog);
router.post('/comment/:blogId', createComment);


module.exports = router;
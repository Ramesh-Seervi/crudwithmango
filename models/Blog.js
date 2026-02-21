const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of your blog
 *         content:
 *           type: string
 *           description: The content of your blog
 *         author:
 *           type: string
 *           description: The author of the blog
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the blog was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         content: Alexander Dewdney
 *         author: John Doe
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    author: {
        type: String,
        required: [true, 'Please add an author']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);

const chai = require('chai');

chai.should();

const { BlogPost } = require('./models');

describe('blogposts', () => {
    it.only('returns the author full name', () => {
        const namePost = new BlogPost({
            author: {
                firstName: "Jean",
                lastName: "Bentley"
            }
        })
        const author = namePost.authorName;
        author.should.equal('Jean Bentley');
    })
})
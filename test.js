const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const { app, runServer, closeServer } = require('./server');

const should = chai.should();
chai.use(chaiHttp);

describe('GET endpoint', function() {
    before(function() {
        return runServer()
    });
    after(function() {
        return closeServer();
    });

    it('should return all posts', function() {
        let res;
        return chai.request(app)
            .get('/posts').then(function(_res) {
                res = _res;
                res, should.have.status(200);
                res.body.posts.should.have.length.of.at.least(count);
            });
    });
});

describe('POST endpoint', function() {
    it('should return all contents of a post', function() {
        const newPost = ['title', 'content', 'author'];
        let mostRecentPost;
        return chai.request(app)
            .post('/posts').send(newPost).then(function(_res) {
                res.should.have.status(201);
                res.body.posts.should.have.length.of.at.least(1);
                res.body.should.be.a('array');
                res.body.shoud.include('title', 'content', 'author');
                res.body.id.should.not.be.null;
            });
        .then(function(BlogPost) {
            BlogPost.title.should.equal(newPost.title);
            BlogPost.content.should.equal(newPost.content);
            BlogPost.author.should.equal(newPost.author);
        })
    });
});

describe('PUT endpoint', function() {
    it('should update fields', function() {
            const updatedPost = ['title', 'content', 'author'];
            return BlogPost.findOne().exec().then(function(BlogPost) {
                updatedPost.id = BlogPost.id;
            })
            return chai.request(app).put(`/posts/${updatedPost.id}`).send(updatedPost)
        })
        .then(function(res) {
            res.should.have.status(200);
            res.body.should.equal(updatedPost.id);
        });
});

describe('delete endpoint', function() {
    it('should delete a post by id', function() {
        return chai.request(app)
            .get('/posts/:id').then(function(res) {
                return chai.request(app)
                    .delete(`/post/${res.body[0].id}`);
            })
            .then(function(res) {
                res.should.have.status(204);
            });
    });
});
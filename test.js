const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const { BlogPost } = require('./models');

const { app, runServer, closeServer } = require('./server');


chai.use(chaiHttp);
const should = chai.should();

describe('posts endpoint', function() {
    before(function() {
        return runServer()
    });
    after(function() {
        return closeServer();
    });

    describe('GET endpoint', function() {

        it('should return all posts', function() {
            return BlogPost.create({ title: 'best blog' }).then(() => {
                return chai.request(app)
                    .get('/posts').then(function(res) {
                        res.should.have.status(200);
                        console.log("contents", res.body);
                        res.body.should.have.length.of.at.least(1);
                    });
            });
        });
    });

    describe('POST endpoint', function() {
        it('post this at the endpoint', function() {
            const newPost = { title: 'another blog', content: 'another', author: 'me' };
            return chai.request(app)
                .post('/posts').send(newPost).then((res) => {
                    console.log("inside then");
                    res.should.have.status(201);
                    res.body.should.have.all.keys('title', 'content', 'author', 'created', 'id');
                    res.body.id.should.not.be.null;
                    return res.body;
                }).then(function(responsePost) {
                    console.log("second then");
                    responsePost.title.should.equal(newPost.title);
                    responsePost.content.should.equal(newPost.content);
                });
            console.log("before done");
            done();
        });
    });

    describe('PUT endpoint', function() {
        it('should update fields', function(done) {
            updatedPost = { id: '598f35078ba2dc46f2cbbc1b' };
            chai.request(app)
                //put - request trying to make is an update, 
                .put(`/posts/${updatedPost.id}`)
                .send(updatedPost)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.equal(updatedPost.id);
                });
            done();
        });
    });

    describe('delete endpoint', function() {
        it('should delete a post by id', function() {
            chai.request(app)
                .get('/posts/:id').then(function(res) {
                    return chai.request(app)
                        .delete(`/post/${res.body[0].id}`);
                }).then(function(res) {
                    res.should.have.status(204);
                });
        });
    });

});


// const updatedPost = ['title', 'content', 'author'];
// return BlogPost.findOne().exec().then(function(BlogPost) {
//     console.log("blog id", BlogPost.id);
//     updatedPost.id = BlogPost.id;
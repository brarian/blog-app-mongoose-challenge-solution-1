const chai = require('chai');

const { BlogPost } = require('./models');
var expect = require('chai').expect;
const should = chai.should();

describe('apiRepr', () => {
    it('returns the instance', () => {
        var input = {
            author: {
                firstName: 'Jean',
                lastName: 'Bentley'
            },
            title: 'A Story',
            content: 'A Song',
            created: 'Today'
        };
        var expected = 'Jean Bentley A Story A Song Today';
        var actual = input.author.firstName + " " + input.author.lastName + " " + input.title + " " + input.content + " " + input.created;
        expect(actual).to.eql(expected);
    });
});
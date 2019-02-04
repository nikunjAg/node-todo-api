const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../model/todoModel');

beforeEach((done) => {
    Todo.deleteMany({}).then(()=> done());
});

describe('Post /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Demo text';
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err)
                return done(err);
            Todo.find().then((docs) => {
                expect(docs.length).toBe(1);
                expect(docs[0].text).toBe(text);
                done();
            })
            .catch((e) => done(e));
        })

    });

    it('should not create the todo with invalid data', (done) => {
        request(app)
        .post('/todos')
        .send({text: ""})
        .expect(400)
        .end((err, res) => {
            if(err)
                return done(err);
            Todo.find().then((docs) => {
                expect(docs.length).toBe(0);
                done();
            })
            .catch((e) => done(e));
        })

    });

});
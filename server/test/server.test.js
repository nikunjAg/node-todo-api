const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../model/todoModel');

var id1 = new ObjectID();

var todos = [{
    text: 'Do something',
    _id: id1
}, {
    text: 'Do something 1'
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done());
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
            Todo.find({text: text}).then((docs) => {
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
                expect(docs.length).toBe(2);
                done();
            })
            .catch((e) => done(e));
        })

    });

});

describe('GET /todos', () => {

    it('it should display all the todos', (done) => {

        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
            expect(res.body.todos[0].text).toBe(todos[0].text);
            expect(res.body.todos[1].text).toBe(todos[1].text);
        })
        .end((err, res)=> {
            if(err)
                return done(err);
            done();
        });

    });

});

describe('GET /todos/:id', () => {

    it('should get the todo', (done) => {
        request(app)
        .get(`/todos/${id1.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end((err, res) => {
            if(err)
                return done(err);
            done();
        });
    });

    it('should return 404 if todo not found ', (done) => {
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end((err, res) => {
            if(err)
                return done(err);
            done();
        });
    });

    it('should return 404 for non Object ids', (done) => {
        request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end((err, res) => {
            if(err)
                return done(err);
            done();
        });
    });
});

describe('DELETE /todos/:id', () => {

    it('should delete the todo', (done) => {
        request(app)
        .delete(`/todos/${id1.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end((err, res) => {
            if(err)
                return done(err);
            Todo.findById(id1).then((todo) => {
                expect(todo).toBe(null);
                done();
            })
            .catch((e) => done(e));
        })
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non Object IDs', (done) => {
        request(app)
        .delete(`/todos/123abc`)
        .expect(404)
        .end(done);
    })

});
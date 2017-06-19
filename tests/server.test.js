const expect = require('expect');
const request = require('supertest');
var {app} = require('./../server/server.js');
var {Todo} = require('./../server/Models/Todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});


describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Hello';


    request(app)
      .post('/Todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) { return done(err); }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(Todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
});

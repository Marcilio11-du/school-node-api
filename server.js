const fastify = require('fastify');

const server = fastify({ logger: true });


const courses = [
    { id: 1, name: 'Introduction to Programming' },
    { id: 2, name: 'Advanced JavaScript' },
    { id: 3, name: 'Database Management' },
]

server.get('/courses', ()=> {
    return courses;
});

server.post('/courses', () => {
    courses.push({ id: 4, name: 'New Course Added' });
    return { message: 'Course added successfully' };
});

server.listen({port: 3333}).then(() => {
  console.log('Server is running on port 3333');
  console.log('Access the server at http://localhost:3333');
});
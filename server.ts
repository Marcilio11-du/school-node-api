//const fastify = require('fastify');
//const crypto = require('crypto');

import fastify from 'fastify';
import crypto from 'node:crypto';

const server = fastify({ logger: true });


const courses = [
    { id: '1', name: 'Introduction to Programming' },
    { id: '2', name: 'Advanced JavaScript' },
    { id: '3', name: 'Database Management' },
]

server.get('/courses', ()=> {
    return { courses };
});

server.post('/courses', (request, reply) => {
    type Body = {
        courseTitle: string;
    }
    let body = request.body as Body;
    let courseTitle = body.courseTitle;
    
    let courseId = crypto.randomUUID()
    courses.push({ id: courseId, name: courseTitle });

    return reply.code(201).send({
        courseId,
        courseTitle
    });
});

server.get('/courses/:id', (request, reply) => {

    type Params = {
        id: string;
    }
    const { id } = request.params as Params;
    const course = courses.find(course => course.id === id);

    if(course) {
        return {course};
    }

    return reply.code(404).send({ message: 'Course not found' });
})

server.listen({port: 3333}).then(() => {
  console.log('Server is running on port 3333');
  console.log('Access the server at http://localhost:3333');
});
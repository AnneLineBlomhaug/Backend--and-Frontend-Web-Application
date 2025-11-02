module.exports = {
    openapi: '3.0.0',
    info: { title: 'VEM API', version: '1.0.0' },
    paths: {
      '/auth/login': {
        post: {
          summary: 'Login a user',
          requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' } } } } } },
          responses: { '200': { description: 'Success', content: { 'application/json': { schema: { type: 'object', properties: { token: { type: 'string' } } } } } } },
        },
      },
      // Add other endpoints
    },
  };
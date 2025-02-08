// migrations/[timestamp]-create-answers-collection.js
module.exports = {
  async up(db) {
    await db.createCollection('answers', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['questionId', 'value'],
          properties: {
            questionId: {
              bsonType: 'objectId',
              description: 'must be an objectId and is required',
            },
            value: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
          },
        },
      },
    });
  },

  async down(db) {
    await db.collection('answers').drop();
  },
};

// migrations/[timestamp]-create-questions-collection.js
module.exports = {
  async up(db) {
    await db.createCollection('questions', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['text', 'type'],
          properties: {
            text: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            type: {
              enum: ['MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'TEXT'],
              description: 'must be one of the enum values',
            },
            options: {
              bsonType: 'array',
              items: {
                bsonType: 'string',
              },
            },
          },
        },
      },
    });
  },

  async down(db) {
    await db.collection('questions').drop();
  },
};

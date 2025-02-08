// migrations/[timestamp]-create-answer-history-collection.js
module.exports = {
  async up(db) {
    await db.createCollection('answerhistories', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['questionId', 'answer'],
          properties: {
            surveyId: {
              bsonType: 'objectId',
              description: 'must be an objectId',
            },
            questionId: {
              bsonType: 'objectId',
              description: 'must be an objectId and is required',
            },
            answer: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            userId: {
              bsonType: 'string',
              description: 'must be a string',
            },
          },
        },
      },
    });
  },

  async down(db) {
    await db.collection('answerhistories').drop();
  },
};

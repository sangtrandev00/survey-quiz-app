module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.createCollection('surveys', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            description: {
              bsonType: 'string',
              description: 'must be a string',
            },
            isActive: {
              bsonType: 'bool',
              description: 'must be a boolean',
            },
            questions: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId',
              },
            },
          },
        },
      },
    });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('surveys').drop();
  },
};

const { createClient } = require("@astrajs/collections");

// Update user templates
exports.handler = async function (event, context) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  });

  const usersCollection = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("users");

  try {
    const user = await usersCollection.update(
      event.queryStringParameters.email,
      {
        email: event.queryStringParameters.email,
        templates: event.queryStringParameters.templates
      }
    );
    console.log("[Backend] Updated user data:", user);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (e) {
    console.log("[Backend] Error", e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

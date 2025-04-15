db = db.getSiblingDB('localhost');
db.createCollection('UserPrefAI');
db.users.insertMany([
  {
    _id: ObjectId("67facbc504c36ea30ccda1b6"),
    username: "gamagamol",
    password: "JDJiJDEyJHUwNkJMR3BUUnowRHh3b25QekM5Uy51WFV4cGl0dFg4cGZpZnowekZIeVJpaVhWQWlsT3ZT",
    preferences: {
      isDarkTheme: false,
      isEnabledNotification: false,
      language: "english"
    }
  }
]);

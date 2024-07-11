const { createContainer, asFunction, asValue } = require("awilix");
const userService = require("../services/userService");
const authService = require("../services/authService");
const jobService = require("../services/jobService");
const userStorage = require("../models/userStorage");
const container = createContainer({});
container.register({
  userService: asFunction(userService),
  userStorage: asFunction(userStorage),
  authService: asFunction(authService),
  jobService: asFunction(jobService),
});

const getOrCreateScope = async () => {
  const scope = container.createScope();

  scope.register({
    ctx: asValue({}),
  });

  return scope;
};

const setContext = async (scope, user) => {
  scope.register({
    ctx: asValue(user),
  });

  return scope;
};
module.exports = {
  getOrCreateScope,
  setContext,
};

"use strict";
exports.__esModule = true;
// src/routes/index.ts
var express_1 = require("express");
var appointments_routes_1 = require("./appointments.routes");
var users_routes_1 = require("./users.routes");
var sessions_routes_1 = require("./sessions.routes");
var routes = express_1.Router();
routes.use('/appointments', appointments_routes_1["default"]);
routes.use('/users', users_routes_1["default"]);
routes.use('/sessions', sessions_routes_1["default"]);
exports["default"] = routes;

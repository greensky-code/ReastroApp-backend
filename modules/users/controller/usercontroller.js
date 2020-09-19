const createEditViewProfile = require('../model/CreateEditViewProfile')
const permission = require('../../rolemanagement/model/permissions')
const role = require('../../rolemanagement/model/role')
const Validator = require('../../../util/validation').validate_all_request;
const {
    logger,
    responses,
    constants,
    commonFunctions
} = require('../../../util');
const Bcrypt = require("bcryptjs");

//Sign API



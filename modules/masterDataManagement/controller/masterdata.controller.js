const country = require("../country_model/country");
const menu = require("../menu_model/menu");
const bank = require("../bank_model/bank");
const suggestedItem = require("../suggested_items_model/suggested_items");

const Validator = require("../../../util/validation").validate_all_request;
const {
  logger,
  responses,
  constants,
  commonFunctions,
} = require("../../../util");
const mongoose = require("mongoose");

exports.countryList = (req, res) => {
  try {
    let query = {
      is_active: true,
    };
    country.find(query, (err, resData) => {
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else {
        return res.json(resData);
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.menuList = (req, res) => {
  try {
    let query = {
      is_active: true,
    };
    menu.find(query, (err, resData) => {
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else {
        return res.json(resData);
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.bankList = (req, res) => {
  try {
    let query = {
      is_active: true,
    };
    bank.find(query, (err, resData) => {
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else {
        return res.json(resData);
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.suggestedItemList = (req, res) => {
  try {
    let menuId = req.params.menuId;
    let query = {
      is_active: true,
      menu_id: parseInt(menuId),
    };
    suggestedItem
      .aggregate([
        {
          $match: query,
        },
      ])
      .exec((err, resdata) => {
        if (err) {
          return res.json({
            message_code: "500",
            message: "Internal_server_error",
          });
        } else {
          return res.json(resdata);
        }
      });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

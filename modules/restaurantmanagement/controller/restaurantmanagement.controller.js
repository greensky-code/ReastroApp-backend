const company = require("../model/company");
const restaurant = require("../model/restaurant");
const menuitem = require("../model/menuitem");
const bank = require("../model/bank");
const { body, check } = require("express-validator/check");
const createEditViewProfile = require("../../users/model/CreateEditViewProfile");

// const { validationResult } = require("express-validator/check");

const {
  QueryList,
} = require("twilio/lib/rest/preview/understand/assistant/query");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.insert = (req, res) => {
  try {
    const userid = req.user._id || req.body.userid;
    const languageCode = req.query.languageCode || "en";
    let query = {
      _id: userid,
    };
    companyData = JSON.parse(req.body.company);
    restaurantData = JSON.parse(req.body.restaurant);
    menuData = JSON.parse(req.body.menu_item);
    bankData = JSON.parse(req.body.bank);
    createEditViewProfile.findOne({ _id: userid }, (err, resdata) => {
      console.log("USer Found");
      if (err) {
        return res.json({
          message_code: "500",
          message: "Internal_server_error",
        });
      } else {
        companyData.created_by = userid;
        companyData.updated_by = userid;
        restaurantData.created_by = userid;
        restaurantData.updated_by = userid;

        company.create(companyData, (error, saveCompany) => {
          if (error) {
            return res.json({
              message_code: "500",
              message: "Internal_server_error",
            });
          }
          restaurantData["company_id"] = saveCompany.company_id;
          restaurant.create(restaurantData, (error, saveRestaurant) => {
            if (error) {
              return res.json({
                message_code: "500",
                message: "Internal_server_error",
              });
            }
            menuData["company_id"] = saveCompany.company_id;
            menuData["restaurant_id"] = saveRestaurant.restaurant_id;
            bankData["company_id"] = saveCompany.company_id;
            bankData["restaurant_id"] = saveRestaurant.restaurant_id;
            menuitem.create(menuData, (error, saveMenu) => {
              if (error) {
                return res.json({
                  message_code: "500",
                  message: "Internal_server_error",
                });
              }
              bank.create(bankData, (error, saveBank) => {
                if (error) {
                  return res.json({
                    message_code: "500",
                    message: "Internal_server_error",
                  });
                }
                return res.json({
                  message_code: "200",
                  message: "Restaurant added sucessfully",
                });
              });
            });
          });
        });
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.list = (req, res) => {
  let option = {
    page: req.query.page || 1,
    limit: 10,
  };
  let query = {
    is_delete: false,
  };

  var aggregate = restaurant.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: "companies",
        localField: "company_id",
        foreignField: "company_id",
        as: "company",
      },
    },
    {
      $lookup: {
        from: "createeditviewprofiles",
        localField: "created_by",
        foreignField: "_id",
        as: "created_by",
      },
    },
    {
      $lookup: {
        from: "createeditviewprofiles",
        localField: "updated_by",
        foreignField: "_id",
        as: "updated_by",
      },
    },
    { $sort: { created_at: -1 } },
  ]);
  restaurant.aggregatePaginate(
    aggregate,
    option,
    (err, result, pages, total) => {
      console.log("err", err);
      if (!err) {
        const success = {
          docs: result,
          total: total,
          limit: option.limit,
          page: option.page,
          pages: pages,
        };
        if (success) {
          let data = {
            data: success.docs,
            message: "Restaurant LIST",
            message_code: "200",
            count: success.total,
          };
          return res.json(data);
        } else {
          return res.json({
            message_code: "500",
            message: "Internal_server_error",
            err: err,
          });
        }
      }
    }
  );
};

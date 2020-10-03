let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let couponSchema = new Schema({

    coupon_image: {
        type: String
    },

    restaurant: {
        type: String
    },

    coupon_code: {
        type: String
    },

    coupon_value: {
        type: Number
    },
    Max_Coupon_Value: {
        type: Number
    },

    end_date: {
        type: Date
    },
    Description: {
        type: String
    },
    City: {
        type: String
    },
    coupon_name: {
        type: String
    },
    coupon_type: {
        type: String
    },
    min_order_value: {
        type: String
    },
    start_date: {
        type: Date
    },
    coupon_quantity: {
        type: Number
    },

    isblock:{
        type: Boolean,
        default: false
    },

    created_at: { type: Date, default: Date.now }


});
module.exports = mongoose.model("coupon", couponSchema);
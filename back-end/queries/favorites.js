const db = require("../db/dbConfig.js");
const pgp = require("pg-promise")();
let QRE = pgp.errors.QueryResultError;
let qrec = pgp.errors.queryResultErrorCode;

//index
const getAllFavorites = async (user_id) => {
  try {
    const allFavorites = await db.any(
      "SELECT * FROM favorites WHERE user_id=$1 ORDER BY vendor_category, vendor_name",
      user_id
    );
    return allFavorites;
  } catch (err) {
    if (err instanceof QRE && err.code === qrec.noData) {
      return null;
    } else {
      return err;
    }
  }
};

//Show
const getOneFavorite = async (user_id, vendor_name) => {
  try {
    const oneFavorite = await db.one(
      "SELECT * FROM favorites WHERE user_id=$1 AND vendor_name=$2",
      [user_id, vendor_name]
    );
    return oneFavorite;
  } catch (err) {
    if (err instanceof QRE && err.code === qrec.noData) {
      return null;
    } else {
      return err;
    }
  }
};

//create
const createFavorite = async (vendor, user_id) => {
  try {
    const newFavorite = await db.one(
      "INSERT INTO favorites (user_id, vendor_name, vendor_address, vendor_phone_number, vendor_category, vendor_id, vendor_image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        user_id,
        vendor.vendor_name,
        vendor.vendor_address,
        vendor.vendor_phone_number,
        vendor.vendor_category,
        vendor.vendor_id,
        vendor.vendor_image,
      ]
    );
    return newFavorite;
  } catch (err) {
    return err;
  }
};

//delete
const deleteFavorite = async (user_id, vendorName) => {
  try {
    const deletedFavorite = await db.one(
      "DELETE FROM favorites WHERE user_id=$1 AND vendor_name=$2 RETURNING *",
      [user_id, vendorName]
    );
    return deletedFavorite;
  } catch (err) {
    return err;
  }
};

//update
const updateFavorite = async (vendor, user_id) => {
  try {
    const updatedFavorite = await db.one(
      "UPDATE favorites SET vendor_address=$1, vendor_phone_number=$2, vendor_category=$3 WHERE user_id=$4 AND vendor_name=$5 RETURNING *",
      [
        vendor.vendor_address,
        vendor.vendor_phone_number,
        vendor.vendor_category,
        user_id,
        vendor.vendor_name,
      ]
    );
    return updatedFavorite;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllFavorites,
  getOneFavorite,
  createFavorite,
  deleteFavorite,
  updateFavorite,
};

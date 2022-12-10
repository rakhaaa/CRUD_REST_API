const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const connection = require("../config/database");

// Index Posts
router.get("/", (req, res) => {
  const sql = "SELECT * FROM posts ORDER BY id DESC";
  connection.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "List Data Posts",
        data: rows,
      });
    }
  });
});

// Store Post
router.post(
  "/store",
  [
    // validation
    body("title").notEmpty(),
    body("content").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // define formData
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // insert query
    const sql = "INSERT INTO posts SET ?";
    connection.query(sql, formData, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Insert Data Post Successfully",
          data: rows[0],
        });
      }
    });
  }
);

// Show Post
router.get("/(:id)", (req, res) => {
  let id = req.params.id;

  // get post by id
  const sql = `SELECT * FROM posts WHERE id = ${id}`;
  connection.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Invalid Server Error",
      });
    }

    // if post empty
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: "Data Post Not Found",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Detail Data Post",
        data: rows[0],
      });
    }
  });
});

// Update Post
router.patch(
  "/update/:id",
  [body("title").notEmpty(), body("content").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // initialize params id
    let id = req.params.id;

    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    const sql = `UPDATE posts SET ? WHERE id = ${id}`;
    connection.query(sql, formData, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Invalid Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Update Data Post Successfuly",
          data: rows[0],
        });
      }
    });
  }
);

// Delete Post
router.delete("/delete/(:id)", (req, res) => {
  let id = req.params.id;

  const sql = `DELETE FROM posts WHERE id = ${id}`;
  connection.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Invalid Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Delete Data Post Successfully",
      });
    }
  });
});

module.exports = router;

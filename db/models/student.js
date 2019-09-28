'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Student.beforeSave((stuInst) => {
  stuInst.firstName = stuInst.firstName[0].toUpperCase() + stuInst.firstName.slice(1);
  stuInst.lastName = stuInst.lastName[0].toUpperCase() + stuInst.lastName.slice(1);
})

module.exports = Student;

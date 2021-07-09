const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const { requestResponse } = require('../config')
 
exports.register = (data) =>
new Promise((resolve, reject) => {
    userModel.findOne({
        username: data.username
    }).then(user => {
        if (user) {
            resolve(requestResponse.gagal('username sudah terdaftar'))
        } else {
            bcrypt.hash(data.password, 10, (err, hash) => {
                data.password = hash
                userModel.create(data)
                .then(() => resolve(requestResponse.sukses('berhasil regristasi')))
                .catch(() => reject(requestResponse.serverError))
            })
        }
    })
})

exports.login = (data) =>
new Promise((resolve, reject) => {
    userModel.findOne({
        username: data.username
    }).then((user) => {
        if (user) {
            if (bcrypt.compareSync(data.password, user.password)) {
                resolve(requestResponse.suksesLogin(user))
            } else {
                reject(requestResponse.gagal('password salah'))
            }
        } else {
            reject(requestResponse.gagal('username tidak terdaftar'))
        }
    })
})

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel.find({
        Level: 2
    }).then(user => {
      resolve(requestResponse.suksesWithData(user))
    }).catch(() => reject(requestResponse.serverError))
  })
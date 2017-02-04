const Promise = require('promise')

const userRepo = require('../../DAL/repositories/user-repository')

class UserService {
    findAllUserService() {
        return new Promise((resolve) => {
            userRepo.findAllUserRepo().then((user) => {
                resolve(user)
            })
        })
    }

    editUserAccountService(id, value) {
        return new Promise((resolve) => {
            userRepo.editUserAccountRepo(id, value).then((user) => {
                resolve(user)
            })
        })
    }
}

module.exports = new UserService()
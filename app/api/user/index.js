import { AsyncStorage } from "react-native";

const ODOO_STORE = "@MyOdooStore"
const CURRENT_USER_ACTIVE_KEY = `${ODOO_STORE}:activeUser`
const LIST_USER_KEY = `${ODOO_STORE}:listUser`

const doUpdateUserList = async(arrayList) => (
    await AsyncStorage.setItem(LIST_USER_KEY, JSON.stringify(arrayList))
)

const doActiveUser = async(user) => {
    await AsyncStorage.setItem(CURRENT_USER_ACTIVE_KEY, JSON.stringify(user))
}

const doClearActiveUser = async() => {
    await AsyncStorage.removeItem(CURRENT_USER_ACTIVE_KEY)
}


const fetchUserList = async() => {
    try {
        let array = await AsyncStorage.getItem(LIST_USER_KEY)
        if (array == null) {
            return []
        }
        return JSON.parse(array)
    } catch (error) {
        return []
    }
}

const fetchCurrentUser = async() => {
    try {
        let userInfo =  await AsyncStorage.getItem(CURRENT_USER_ACTIVE_KEY)
        return JSON.parse(userInfo)
    } catch (error) {
        console.error(`[fetchCurrentUser] ${error}`)
    }
    return null
}

const findUserInUserList = (userList, user) => {
    let itemFound = null;
    for (let item of userList) {
            if (item.auth.username == user.auth.username) {
                itemFound = item;
                break
            }
    }
    return itemFound
}

const removeUserFromList = (userList, user) => {
    let newListUser = []
    for (let item of userList) {
        if (item.auth.username != user.auth.username) {
            newListUser.push(item)
        }
    }
    return newListUser
}

export default class UserSession {

    constructor() {
    }

    saveUser (user) {
        return new Promise(async(resolve, reject) => {
            try {
                const arrayList = await fetchUserList()
                let found = findUserInUserList(arrayList, user)
                if (found) {
                    await doActiveUser(user)
                    return resolve(true)
                }
                arrayList = arrayList.concat(user)
                await doUpdateUserList(arrayList)
                await doActiveUser(user)
            } catch (error) {
                return reject(false)
            }
            return resolve(true)
        })
    }

    getUserActive = async() => (
        await fetchCurrentUser()
    )

    loadList = async() => {
        return await fetchUserList()
    }

    removeUser(user){
        return new Promise(async(resolve, reject) => {
            try {
                const userList = await fetchUserList()
                let newListUser = removeUserFromList(userList, user)
                await doUpdateUserList(newListUser)
                await doClearActiveUser()
            } catch (error) {
                return reject(error)
            }
            return resolve(true)
        })
    }

}

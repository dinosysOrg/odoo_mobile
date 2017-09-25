import { AsyncStorage } from "react-native";
// The main store key
const ODOO_STORE = "@MyOdooStore"
// The user active key, contain user info for current user.
const CURRENT_USER_ACTIVE_KEY = `${ODOO_STORE}:activeUser`
// The list user key, contain list user already login.
const LIST_USER_KEY = `${ODOO_STORE}:listUser`

/**
 * Do update user list 
 * @param {array} arrayList: The array list of user
 */ 
const doUpdateUserList = async(arrayList) => (
    await AsyncStorage.setItem(LIST_USER_KEY, JSON.stringify(arrayList))
)

/**
 * Do update user list 
 * @param {object} user: The user 
 * @param {object} user.auth: Contain info about authentication {db, url, username, password}
 * @param {object} user.profile: Contain info about the profile of user
 * @param {object} user.roles: Contain roles of user
 */ 
const doActiveUser = async(user) => {
    await AsyncStorage.setItem(CURRENT_USER_ACTIVE_KEY, JSON.stringify(user))
}

/**
 * Clear active current user 
 */
const doClearActiveUser = async() => {
    await AsyncStorage.removeItem(CURRENT_USER_ACTIVE_KEY)
}


/**
 * Get list user 
 */
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

/**
 * Get current user active
 */
const fetchCurrentUser = async() => {
    try {
        let userInfo =  await AsyncStorage.getItem(CURRENT_USER_ACTIVE_KEY)
        return JSON.parse(userInfo)
    } catch (error) {
        console.error(`[fetchCurrentUser] ${error}`)
    }
    return null
}

/**
 * Find user in userList by username property.
 * @param {array} userList: The array list of user
 * @param {object} user: The user
 * @return null: if not found
 *         user: if found
 */
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

/**
 * Remove user in userList by username property.
 * @param {array} userList: The array list of user
 * @param {object} user: The user
 * @return array: New array list user
 */
const removeUserFromList = (userList, user) => {
    let newListUser = []
    for (let item of userList) {
        if (item.auth.username != user.auth.username) {
            newListUser.push(item)
        }
    }
    return newListUser
}

/**
 * The api for user session login.
 */
export default class UserSession {

    constructor() {

    }

    /**
    * Save user into session
    * @param {object} user: The user 
    * @param {object} user.auth: Contain info about authentication {db, url, username, password}.
    * @param {object} user.profile: Contain info about the profile of user.
    * @param {object} user.roles: Contain roles of user.
    */
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

    /**
     * Get current user active
     */
    getUserActive = async() => (
        await fetchCurrentUser()
    )

    /**
     * Get list user from session
     */
    loadList = async() => {
        return await fetchUserList()
    }

    /**
     * Remove user 
     * @param {object} user The user
     */
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

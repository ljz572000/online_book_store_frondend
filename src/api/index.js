/**
 * 包含应用中所有接口请求函数的模块
 */
import ajax from './ajax'
// 登陆
//  export function reqLogin(){
//      ajax()
//  }
export const reqLogin = (userId) => ajax('/login', { userId }, 'POST');
export const reqGoToResetPage = (userId) => ajax('/goToResetPage', { userId }, 'POST');
export const reqinsertAUser = (userId, isAdmin, userPassword, userIconPath, userName, major, address, mail, birth, isFemale) => ajax('/insertAUser', {
    userId,
    isAdmin,
    userPassword,
    userIconPath,
    userName,
    major,
    address, mail, birth, isFemale
}, 'POST');
export const reqTextbooks = (pagecount, size) => ajax('/Textbooks', { pagecount, size }, 'GET');
export const reqbuytextbook = (book_no,book_num,book_values,user_no) => ajax('/AddOrders',{ book_no , book_num , book_values ,user_no },'GET');
export const reqUpdateTextBookNum = (buyNum,bookNo) => ajax('/UpdateTextBookNum',{buyNum,bookNo},'GET');
export const reqUpdateUserMoney = (user_no,money) => ajax('/chargeMoney',{user_no,money},'POST');
export const reqMessage = (pagecount,size,user_no) => ajax('/Messages',{pagecount,size,user_no},'GET');
export const reqAddShoppingCart = (book_no,book_num,book_values,user_no) => ajax('/addShoppingCart',{book_no,book_num,book_values,user_no},'GET');
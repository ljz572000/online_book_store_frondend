/**
 * 包含应用中所有接口请求函数的模块
 */
import ajax from './ajax'
// 登陆
//  export function reqLogin(){
//      ajax()
//  }
const Base = '/api'
export const reqLogin = (userId) => ajax(Base+'/login', { userId }, 'POST');
export const reqGoToResetPage = (userId) => ajax(Base+'/goToResetPage', { userId }, 'POST');
export const reqinsertAUser = (userId, isAdmin, userPassword, userIconPath, userName, major, address, mail, birth, isFemale) => ajax(Base+'/insertAUser', {
    userId,
    isAdmin,
    userPassword,
    userIconPath,
    userName,
    major,
    address, mail, birth, isFemale
}, 'POST');
export const reqTextbooks = (pagecount, size) => ajax(Base+'/Textbooks', { pagecount, size }, 'GET');
export const reqAllTextbooks = (pagecount, size) => ajax(Base+'/AllTextbooks', { pagecount, size }, 'GET');
export const reqbuytextbook = (book_no,book_num,book_values,user_no) => ajax(Base+'/AddOrders',{ book_no , book_num , book_values ,user_no },'GET');
export const reqUpdateTextBookNum = (buyNum,bookNo) => ajax(Base+'/UpdateTextBookNum',{buyNum,bookNo},'GET');
export const reqUpdateUserMoney = (user_no,money) => ajax(Base+'/chargeMoney',{user_no,money},'POST');
export const reqMessage = (pagecount,size,user_no) => ajax(Base+'/Messages',{pagecount,size,user_no},'GET');
export const reqAddShoppingCart = (book_no,book_num,book_values,user_no) => ajax(Base+'/addShoppingCart',{book_no,book_num,book_values,user_no},'GET');
export const reqShoppingCarts = (pagecount, size,user_no) => ajax(Base+'/ShoppingCarts', { pagecount, size,user_no}, 'GET');
export const reqdeleteShoppingCarts = (shopping_cart_no) => ajax(Base+'/deleteShoppingCarts', { shopping_cart_no}, 'GET');
export const reqOrders = (pagecount, size,user_no) => ajax(Base+'/Orders', { pagecount, size,user_no}, 'GET');
export const reqdeleteOrders = (order_no) => ajax(Base+'/deleteOrder', { order_no}, 'GET');
export const reqrepairPwd = (user_no,user_pwd) => ajax(Base+'/repairPwd',{user_no,user_pwd},'POST');
export const reqchangeData = (userNo,address,major,mail,birth) => ajax(Base+'/changeData',{userNo,address,major,mail,birth},'POST');
export const reqChangeTextBook = (changNum,price,bookNo) => ajax(Base+'/ChangeTextBook',{changNum,price,bookNo},'post');
export const reqchargeMoney = (user_no,money) => ajax(Base+'/chargeMoney',{user_no,money},'post');
export const reqinsertNewBook = (author,book_name, book_pic, book_price,brief, totalnum) => ajax(Base+'/insertNewBook', { author,book_name, book_pic, book_price,brief, totalnum}, 'GET');
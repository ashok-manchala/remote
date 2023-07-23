import expect, {setDefaultOptions} from "expect-puppeteer";
import LoginData from "../repo/loginPageData";
import PageData from "../repo/mainPageData";
setDefaultOptions({timeout: 60000});
import {initializePage} from "../home/util";

export const login = (page,username = LoginData.credential.tenantUsername,password=LoginData.credential.ssPassword)=>{
  return new Promise(async (resolve,reject)=>{
    try{
      if(page === null || page === undefined){
        page= await initializePage();
      }
      await global.stack.do(page,"navigating to login URL",()=>page.goto(LoginData.credential.url));
      await global.stack.do(page,"wait for 5 sec",()=>page.waitForTimeout(5000));
      if(await assertLoggedInPage(page)){
          let userDet = await page.evaluate(()=> window.nbui_getCurrentUser());
          await console.log("logged user email "+userDet);
          await console.log("logged user email "+userDet.email);
          await console.log("User Name "+username);
          if(userDet.email != username){
            await console.log("Logged in user is not same as required user.So logging out and login again");
            await  global.stack.do(page,"calling logout",()=>logout(page));
            await  global.stack.do(page,"Matching UserName ",()=>expect(page).toMatchElement(LoginData.selectors.userName,{visible:true}));
            await  global.stack.do(page,"Fill UserName "+username,()=>expect(page).toFill(LoginData.selectors.userName,username));
            await  global.stack.do(page,"Fill Password",()=>expect(page).toFill(LoginData.selectors.password,password));
            await  global.stack.do(page,"Clicking on Submit button",()=>expect(page).toClick(LoginData.selectors.submit));
            await  global.stack.do(page,"Matching User avatar",()=>expect(page).toMatchElement(PageData.selectors.userAvatarIcon,{timeout:180000}));
          }else{
            await console.log("Required user is already logged in ...Navigating to home page");
            await  global.stack.do(page,"Asserting for user avatar ",()=>expect(page).toMatchElement(PageData.selectors.userAvatarIcon,{timeout:180000}));
          }
        }
        else {
          console.log("User is not in logged in page ,so logging in..Current URL : "+await page.url());
          await global.stack.do(page,"navigating to login URL from else",()=>page.goto(LoginData.credential.url));
          await global.stack.do(page,"Fill UserName "+username,()=> expect(page).toFill(LoginData.selectors.userName,username));
          await global.stack.do(page,"Fill Password",()=>expect(page).toFill(LoginData.selectors.password,password));
          await global.stack.do(page,"Clicking on submit button",()=> expect(page).toClick(LoginData.selectors.submit));
          await global.stack.do(page,"Asserting for user avatar after login",()=>  expect(page).toMatchElement(PageData.selectors.userAvatarIcon,{timeout:180000}));


        }
      if(await assertLoggedInPage(page)){
        resolve(console.log("Login Successful"));
      }else{
        reject(console.log("Login Not happened"));
      }

    }catch(ex){
      console.log("Unable to login",ex);
      throw ex;
    }
  })
};
export const assertLoggedInPage=async(page) =>{
  let helpIcon = await page.$$(PageData.selectors.helpIcon)
  let notificationIcon = await  page.$$(PageData.selectors.notificationIcon)
  let userIcon = await  page.$$(PageData.selectors.userAvatarIcon)
  if(helpIcon.length>0 || notificationIcon.length>0 || userIcon.length>0) {
    await console.log("User is in logged in page")
    return true
  }else
    return false
}
export const openWorkbookFromList = (page,workbookName="Companies") =>{
  return new Promise(async (resolve,reject)=>{
    if(page === null || page === undefined){
      throw new Error("Invalid Page");
    }
    try{
      await expect(page).toMatchElement(PageData.selectors.mainContent);
      await expect(page).toClick(PageData.selectors.hamburgerMenu);
      await expect(page).toClick(PageData.selectors.workbookMenu);
      await expect(page).toMatchElement(PageData.selectors.workbookList);
      const anchorEle = await expect(page).toMatchElement(PageData.selectors.workbookLink);
      await anchorEle.hover();
      await anchorEle.click();
      await expect(page).toMatchElement(PageData.selectors.workbookTab,{text:workbookName});
      resolve("Opened Workbook");
    }catch(ex){
      console.log("Unable to Open Workbook",ex);
      throw ex;
    }
  })
};


export const logout = (page)=>{
  return new Promise(async (resolve,reject)=>{
    try{
      var d = new Date();
      await page.screenshot({path:"clicking on global header"+d.getHours()+d.getMinutes()+d.getSeconds()+'.jpg'})
      await expect(page).toClick(LoginData.selectors.globalHeader);
      await page.screenshot({path:"before clicking on Logout"+d.getHours()+d.getMinutes()+d.getSeconds()+'.jpg'})
      await expect(page).toClick(LoginData.selectors.logOut);
      await page.screenshot({path:"afterLogout"+d.getHours()+d.getMinutes()+d.getSeconds()+'.jpg'})
      await expect(page).toMatchElement(LoginData.selectors.userName);
      resolve();
    }catch(ex){
      console.log("Not Logged In. Not required to Logout",ex);
      throw ex;
    }
  })
};

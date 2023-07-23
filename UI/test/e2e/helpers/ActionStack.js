export default class ActionStack {
    constructor() {
        this.actionsSoFar = [];
    }
    async do(page,actionDescription, action) {
        let curTime
        try {
            let now = new Date();
            curTime=new Date(now).toISOString();
            console.log(`[${curTime}][INFO] ${actionDescription}`);
            this.actionsSoFar.push(actionDescription);
            return await action();
        } catch (e) {

            console.log(e);
            this.actionsSoFar.pop();
            let errorMessage = `===========================================================\nFailed during action "${actionDescription}", due to error: ${e}\n`;
            errorMessage += 'Actions leading up to failure:\n';
            for (let i = this.actionsSoFar.length >= 3 ? this.actionsSoFar.length - 3 : 0;
                 i < this.actionsSoFar.length; i++) {
                errorMessage += '"' + this.actionsSoFar[i] + '"\n';
            }
            errorMessage += "\n**********************************************************";
            var d = new Date();
            await page.screenshot({path:actionDescription+d.getHours()+d.getMinutes()+d.getSeconds()+'.jpg'})
            console.log("Captured screenshot with name "+actionDescription+d.getHours()+d.getMinutes()+d.getSeconds()+".jpg")
            throw Error(errorMessage);
        }
    }
}
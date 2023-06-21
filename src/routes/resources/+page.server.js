import {mySingleton} from "$lib/my_module.js"
import {getParams} from "$lib/load-params.js"

const module2 = (function () {
    const singletonInstance = mySingleton.getInstance();

    console.log(singletonInstance.getVariable()); // Output: Updated
})();

export async function load(){
    // module2
    // let d = await getParams()
    // console.log(d)
    return {}
}
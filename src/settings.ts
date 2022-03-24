interface Settings {
	db: string,
}

import fs from "fs";
import yaml from "js-yaml";

declare global {
    namespace NodeJS {
        interface Global {
            settings: Settings|undefined;
        }
    }
}
global.settings = (() => {
	if(typeof process.env.SETTINGS !== "undefined"){
		try {
			return yaml.load(fs.readFileSync(process.env.SETTINGS, "utf-8"));
		} catch(e){
			return yaml.load(process.env.SETTINGS);
		}
	} else try {
		return yaml.load(fs.readFileSync("settings.yaml", "utf-8"));
	} catch(e){
		return undefined;
	}
})() as any;
export default global.settings;

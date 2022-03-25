export interface Settings {
	port?: number;
	db: {
		connectionString?: string;
		host?: string;
		port?: number;
		user?: string;
		password?: string;
		max?: number;
	},
}

import fs from "fs";
import yaml from "js-yaml";

export default (() => {
	if(typeof process.env.SETTINGS_FILE !== "undefined") try {
		return yaml.load(fs.readFileSync(process.env.SETTINGS_FILE, "utf-8")) as Settings;
	} catch(e){
		return undefined;
	} else if(typeof process.env.SETTINGS !== "undefined") return yaml.load(process.env.SETTINGS) as Settings;
	else try {
		return yaml.load(fs.readFileSync("settings.yaml", "utf-8")) as Settings;
	} catch(e){
		return undefined;
	}
});

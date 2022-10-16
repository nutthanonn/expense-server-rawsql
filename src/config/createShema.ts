import fs from "fs";

export const sqlShema = fs.readFileSync("src/command/table.sql").toString();

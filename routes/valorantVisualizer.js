import fs from "fs";
import {join} from "path";

app.get("/valorant", (req, res) => {
    const { name, tag, scale } = req.query;
    console.log(name, tag, scale);
    const html = fs.readFileSync(join(publicDir, "valorant", "index.html"), "utf8");
    res.send(html);
});
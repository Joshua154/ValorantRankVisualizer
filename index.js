const express = require("express");
const fs = require("fs");
const app = express();
const obfuscate = require("html-obfuscator");

app.use(express.static(__dirname));

app.get("/valorant", (req, res) => {
    // Replace the placeholders with actual values from the query parameters
    const { name, tag, scale } = req.query;
    let obfuscatedScript = obfuscate("private/script.js").split("//")[0];
    obfuscatedScript = obfuscatedScript.replace("<script language=\"javascript\">document.write", "eval") + ";"
    obfuscatedScript = obfuscatedScript.replace("\n", "")

    const style = fs.readFileSync("private/styles.css", "utf8");
    let html = fs.readFileSync("private/index.html", "utf8");

    html = html.replaceAll("{{name}}", name);
    html = html.replaceAll("{{tag}}", tag);
    html = html.replaceAll("{{scale}}", scale);

    html = html.replaceAll("{{script}}", obfuscatedScript);
    html = html.replaceAll("{{style}}", style);

    console.log(obfuscatedScript)

    res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

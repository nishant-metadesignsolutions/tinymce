const express = require("express");
const path = require("path");
const fse = require("fs-extra");

const app = express();
const PORT = process.env.PORT || 3000;
const topDir = __dirname;

// Ensure tinymce files are available in public directory
fse.emptyDirSync(path.join(topDir, "public", "tinymce"));
fse.copySync(path.join(topDir, "node_modules", "tinymce"), path.join(topDir, "public", "tinymce"), { overwrite: true });

// Serve tinymce.min.js from a specific directory
app.get("/tinymce/tinymce.min.js", (req, res) => {
    res.sendFile(path.join(__dirname, "public/tinymce/tinymce.min.js"));
});

// Optional: Serve static files from 'public' directory
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

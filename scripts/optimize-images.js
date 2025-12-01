import fs from "fs";
import path from "path";
import sharp from "sharp";

const imagesDir = "public/images/blogs";

fs.readdirSync(imagesDir).forEach(file => {
  const filePath = path.join(imagesDir, file);
  const ext = path.extname(file).toLowerCase();

  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const outPath = path.join(imagesDir, file.replace(ext, ".webp"));
    sharp(filePath)
      .resize({ width: 1600 })
      .toFormat("webp", { quality: 80 })
      .toFile(outPath)
      .then(() => console.log(`✅ Optimized ${file} → ${outPath}`))
      .catch(err => console.error(`❌ Error optimizing ${file}:`, err));
  }
});

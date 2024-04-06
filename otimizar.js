const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeQuality = async (inputPath, outputPath) => {
    try {
        const originalMetadata = await sharp(inputPath).metadata();
        const newWidth = Math.round(originalMetadata.width * 0.5);
        const newHeight = Math.round(originalMetadata.height * 0.5);

        const optimizedImage = await sharp(inputPath)
            .resize({ width: 280, fit: 'inside' })
            .webp({ quality: 80 })
            .toBuffer();

        await fs.promises.writeFile(outputPath, optimizedImage);

        console.log(`Imagem otimizada: ${outputPath}`);
    } catch (err) {
        console.error('Erro ao otimizar a qualidade da imagem:', err);
    }
};

const inputDir = path.join(__dirname, 'Img');
const outputDir = path.join(__dirname, 'ImgOtimizada');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Erro ao ler o diretório:', err);
        return;
    }

    files.forEach(file => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + '.webp');

        optimizeQuality(inputPath, outputPath);
    });
});

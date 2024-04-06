const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const readImageMetadata = async (directory) => {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filePath = path.join(directory, file);
        try {
            const metadata = await sharp(filePath).metadata();
            console.log(`${file}, Resolução: ${metadata.width}x${metadata.height}`);
        } catch (err) {
            console.error(`Erro ao ler metadados da imagem ${file}:`, err);
        }
    }
};

const directory = path.join(__dirname, 'Img');
readImageMetadata(directory);

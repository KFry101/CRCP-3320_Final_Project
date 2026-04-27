import ejs from 'ejs';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsDir = path.join(__dirname, 'views');

async function renderTemplate(templateName, outputPath, data = {}) {
  try {
    const templatePath = path.join(viewsDir, `${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, data, { views: viewsDir });
    
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write the HTML file
    await fs.writeFile(outputPath, html);
    console.log(`✓ Generated: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error generating ${templateName}:`, error.message);
  }
}

async function buildStaticPages() {
  console.log('Building static pages for GitHub Pages...\n');

  // Render about page
  await renderTemplate('about', path.join(__dirname, 'docs', 'about', 'index.html'));
  
  // Render gallery page (optional, since it's commented out)
  await renderTemplate('gallery', path.join(__dirname, 'docs', 'gallery', 'index.html'));

  // Load artworks data
  const artworksData = await fs.readFile(path.join(__dirname, 'artworks.json'), 'utf8');
  const artworks = JSON.parse(artworksData);

  // Generate individual artwork pages
  for (const artwork of artworks) {
    const outputPath = path.join(__dirname, 'docs', 'artwork', artwork.id, 'index.html');
    await renderTemplate('artwork', outputPath, { page: artwork });
  }

  // Render main artwork gallery page with sample data
  const sampleArtwork = {
    name: 'Sample Artwork',
    description: 'An example artwork piece',
    pieces: [
      { path: 'images/placeholder.jpg' }
    ]
  };
  await renderTemplate('artwork', path.join(__dirname, 'docs', 'artwork', 'index.html'), { page: sampleArtwork });

  console.log('\n✓ Static pages built successfully!');
}

buildStaticPages().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});

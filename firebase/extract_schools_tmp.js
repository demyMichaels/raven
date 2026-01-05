const fs = require('fs');
const path = require('path');

try {
    // Get the schools.html path from command line argument or use default
    const schoolsHtmlPath = process.argv[2] || 'schools.html';
    console.log(`Reading from: ${schoolsHtmlPath}`);
    
    if (!fs.existsSync(schoolsHtmlPath)) {
        console.error(`❌ File not found: ${schoolsHtmlPath}`);
        console.error(`Current directory: ${process.cwd()}`);
        console.error(`Files in directory:`, fs.readdirSync('.'));
        process.exit(1);
    }
    
    const html = fs.readFileSync(schoolsHtmlPath, 'utf8');
    
    // Extract all option tags
    const regex = /<option value="([^"]+)">([^<]+)<\/option>/g;
    const schools = {};
    let match;
    let count = 0;
    let skipped = 0;
    
    console.log('Extracting schools...');
    
    while ((match = regex.exec(html)) !== null) {
        const value = match[1].trim();
        const name = match[2].trim();
        
        if (!value || value === '') {
            skipped++;
            continue;
        }
        
        // Skip placeholder options
        if (name.includes('All School Communities') || 
            name.includes('Select institution') || 
            name === 'Other' ||
            name === '') {
            skipped++;
            continue;
        }
        
        schools[value] = name;
        count++;
        
        // Show progress for large files
        if (count % 100 === 0) {
            console.log(`  Extracted ${count} schools...`);
        }
    }
    
    // Save to JSON
    const outputPath = path.join(process.cwd(), 'schools.json');
    fs.writeFileSync(outputPath, JSON.stringify(schools, null, 2));
    
    console.log(`\n✅ Extraction complete!`);
    console.log(`   Total schools found: ${count}`);
    console.log(`   Skipped entries: ${skipped}`);
    console.log(`   Saved to: ${outputPath}`);
    
    // Show sample
    const entries = Object.entries(schools);
    if (entries.length > 0) {
        console.log(`\n📋 Sample (first 3):`);
        entries.slice(0, 3).forEach(([id, name], index) => {
            console.log(`   ${index + 1}. ${id}: ${name}`);
        });
        
        console.log(`\n📋 Sample (last 3):`);
        entries.slice(-3).forEach(([id, name], index) => {
            console.log(`   ${index + 1}. ${id}: ${name}`);
        });
    }
    
    // Also output count for bash script to capture
    console.log(`__COUNT__${count}__`);
    
    process.exit(0);
    
} catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.error(`Stack: ${error.stack}`);
    process.exit(1);
}

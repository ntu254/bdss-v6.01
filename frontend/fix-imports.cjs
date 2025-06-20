#!/usr/bin/env node

/**
 * Fix Import Script - Sửa tất cả import cn từ utils/cn sang utils/ui-helpers
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/ui/Toast.jsx',
  'src/components/ui/Modal.jsx', 
  'src/components/ui/Dropdown.jsx',
  'src/components/ui/Loading.jsx',
  'src/components/ui/Table.jsx',
  'src/components/ui/Tabs.jsx',
  'src/components/ui/Alert.jsx',
  'src/components/ui/Text.jsx',
  'src/components/ui/Skeleton.jsx',
  'src/components/ui/Section.jsx',
  'src/components/ui/Grid.jsx',
  'src/components/ui/Flex.jsx',
  'src/components/ui/Container.jsx',
  'src/components/ui/Avatar.jsx'
];

function fixImports(filePath) {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;
    
    // Fix cn import
    content = content.replace(
      /import { cn } from ['"]\.\.\/\.\.\/utils\/cn['"];?/g,
      "import { cn } from '../../utils/ui-helpers';"
    );
    
    if (originalContent !== content) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`📄 No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

console.log('🔧 Starting import fixes...\n');

filesToFix.forEach(filePath => {
  fixImports(filePath);
});

console.log('\n✅ Import fix process completed!');

module.exports = { fixImports };

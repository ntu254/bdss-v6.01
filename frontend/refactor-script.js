#!/usr/bin/env node

/**
 * Refactor Script - Tự động loại bỏ code lặp và cập nhật import
 * 
 * Script này sẽ:
 * 1. Thay thế PageContainer bằng Container
 * 2. Loại bỏ các className lặp lại
 * 3. Cập nhật import statements
 * 4. Tối ưu hóa cấu trúc code
 */

const fs = require('fs');
const path = require('path');

// Utility functions
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
};

const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error.message);
  }
};

// Refactor rules
const refactorRules = [
  // Replace PageContainer with Container
  {
    name: 'Replace PageContainer import',
    pattern: /import PageContainer from ['"][^'"]*PageContainer['"];?/g,
    replacement: "import { Container } from '../components';"
  },
  {
    name: 'Replace PageContainer usage',
    pattern: /<PageContainer([^>]*)>/g,
    replacement: '<Container$1>'
  },
  {
    name: 'Replace PageContainer closing tag',
    pattern: /<\/PageContainer>/g,
    replacement: '</Container>'
  },
  
  // Replace common repeated className patterns
  {
    name: 'Replace flex items-center',
    pattern: /className="([^"]*)?flex items-center([^"]*)"/g,
    replacement: (match, prefix = '', suffix = '') => {
      const cleanPrefix = prefix.trim() ? prefix.trim() + ' ' : '';
      const cleanSuffix = suffix.trim() ? ' ' + suffix.trim() : '';
      return `className="${cleanPrefix}${flex.itemsCenter}${cleanSuffix}"`;
    }
  },
  
  // Replace text size patterns
  {
    name: 'Replace text-2xl font-bold',
    pattern: /className="([^"]*)?text-2xl font-bold([^"]*)"/g,
    replacement: (match, prefix = '', suffix = '') => {
      const cleanPrefix = prefix.trim() ? prefix.trim() + ' ' : '';
      const cleanSuffix = suffix.trim() ? ' ' + suffix.trim() : '';
      return `className="${cleanPrefix}${typography.heading2}${cleanSuffix}"`;
    }
  },
  
  // Replace common spacing patterns
  {
    name: 'Replace mb-6',
    pattern: /className="([^"]*)?mb-6([^"]*)"/g,
    replacement: (match, prefix = '', suffix = '') => {
      const cleanPrefix = prefix.trim() ? prefix.trim() + ' ' : '';
      const cleanSuffix = suffix.trim() ? ' ' + suffix.trim() : '';
      return `className="${cleanPrefix}${spacing.mb6}${cleanSuffix}"`;
    }
  }
];

// List of files to refactor
const filesToRefactor = [
  'src/pages/admin/AdminBloodInventoryPage.jsx',
  'src/pages/VerifyEmailPage.jsx',
  'src/pages/RequestDonationPage.jsx',
  'src/pages/admin/AdminEmergencyRequestsPage.jsx',
  'src/pages/admin/AdminDonationHistoryPage.jsx',
  'src/pages/admin/AdminBloodTypePage.jsx',
  'src/pages/admin/AdminBloodCompatibilityPage.jsx',
  'src/pages/admin/AdminUserListPage.jsx',
  'src/pages/admin/AdminUserEditPage.jsx',
  'src/pages/admin/AdminUserDetailPage.jsx',
  'src/pages/admin/AdminDashboardPage.jsx',
  'src/pages/staff/StaffDashboardPage.jsx',
  'src/pages/LoginPage.jsx',
  'src/pages/BloodRequestsPage.jsx',
  'src/pages/BlogDetailPage.jsx'
];

// Main refactor function
function refactorFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  let content = readFile(fullPath);
  if (!content) return;
  
  let hasChanges = false;
  
  // Apply refactor rules
  refactorRules.forEach(rule => {
    const originalContent = content;
    
    if (typeof rule.replacement === 'function') {
      content = content.replace(rule.pattern, rule.replacement);
    } else {
      content = content.replace(rule.pattern, rule.replacement);
    }
    
    if (originalContent !== content) {
      hasChanges = true;
      console.log(`  ✨ Applied: ${rule.name}`);
    }
  });
  
  // Additional optimizations for specific patterns
  
  // Replace repeated grid patterns
  content = content.replace(
    /className="grid grid-cols-1 md:grid-cols-([2-4]) gap-([4-8])"/g,
    (match, cols, gap) => `className="{cn(grid.grid, helpers.gridCols('1 md:${cols}'), spacing.gap${gap})}"`
  );
  
  // Replace repeated text classes
  content = content.replace(
    /className="text-(\w+) text-(\w+)-(\d+)"/g,
    (match, size, color, shade) => `className="{cn(typography.${size}, colors.text.${color})}"`
  );
  
  // Add necessary imports if helper functions are used
  if (content.includes('cn(') || content.includes('spacing.') || content.includes('typography.')) {
    if (!content.includes("from '../../utils/ui-helpers'") && !content.includes("from '../utils/ui-helpers'")) {
      const importPath = filePath.includes('pages/admin/') ? '../../utils/ui-helpers' : '../utils/ui-helpers';
      content = content.replace(
        /(import.*from ['"][^'"]*['"];?\n)/,
        `$1import { cn, spacing, typography, colors, flex, grid, helpers } from '${importPath}';\n`
      );
      hasChanges = true;
    }
  }
  
  if (hasChanges) {
    writeFile(fullPath, content);
  } else {
    console.log(`📄 No changes needed: ${filePath}`);
  }
}

// Run refactor on all files
console.log('🚀 Starting refactor process...\n');

filesToRefactor.forEach(filePath => {
  console.log(`📝 Processing: ${filePath}`);
  refactorFile(filePath);
  console.log('');
});

console.log('✅ Refactor process completed!');
console.log('\n📋 Summary:');
console.log('- Replaced PageContainer with Container');
console.log('- Optimized common className patterns');
console.log('- Added helper utility imports where needed');
console.log('- Reduced code duplication');

module.exports = { refactorFile, refactorRules };

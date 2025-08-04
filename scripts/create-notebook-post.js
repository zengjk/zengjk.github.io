#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper function to create a new notebook post
function createNotebookPost(title, notebookFile, repoName, category = 'research') {
  const date = new Date().toISOString().split('T')[0];
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const postContent = `---
title: ${title}
date: ${date}
tags:
  - jupyter-notebook
  - research
  - ${category}
categories:
  - notebooks
academia: true
---

## ${title}

Brief description of what this notebook demonstrates and its significance.

### Abstract

Provide a concise abstract of the research or analysis presented in this notebook.

### Key Features

- **Feature 1**: Description of the first key feature
- **Feature 2**: Description of the second key feature
- **Feature 3**: Description of the third key feature

### Interactive Notebook

<div class="notebook-embed" 
     data-notebook="https://raw.githubusercontent.com/yourusername/${repoName}/main/${notebookFile}.ipynb"
     data-repo="https://github.com/yourusername/${repoName}">
</div>

### Key Results

1. **Result 1**: Description of the first key result
2. **Result 2**: Description of the second key result
3. **Result 3**: Description of the third key result

### Code Repository

The complete implementation is available on GitHub: [${repoName}](https://github.com/yourusername/${repoName})

### Related Publications

- "Publication Title" - Journal/arXiv link
- "Another Publication" - Journal/arXiv link

---

*This notebook demonstrates [brief description]. The code is open source and available for educational and research purposes.*
`;

  const fileName = `${date}-${slug}.md`;
  const filePath = path.join(__dirname, '../source/_posts', fileName);
  
  fs.writeFileSync(filePath, postContent);
  
  console.log(`✅ Created new notebook post: ${fileName}`);
  console.log(`📁 Location: ${filePath}`);
  console.log(`🔗 Edit the file to customize content and update GitHub URLs`);
  
  return fileName;
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log(`
Usage: node create-notebook-post.js "Post Title" "notebook-file-name" "repo-name" [category]

Examples:
  node create-notebook-post.js "Quantum State Analysis" "state_analysis" "quantum-analysis"
  node create-notebook-post.js "ML Pipeline Demo" "ml_pipeline" "ml-demo" "machine-learning"
    `);
    process.exit(1);
  }
  
  const [title, notebookFile, repoName, category = 'research'] = args;
  createNotebookPost(title, notebookFile, repoName, category);
}

module.exports = { createNotebookPost }; 
// Jupyter Notebook Embedding Helper
// This script helps embed Jupyter notebooks directly into your Hexo website

class NotebookEmbedder {
  constructor() {
    this.notebooks = [];
    this.init();
  }

  init() {
    // Initialize notebook embedding functionality
    this.setupNotebookEmbeds();
  }

  setupNotebookEmbeds() {
    // Find all notebook embed containers
    const embedContainers = document.querySelectorAll('.notebook-embed');
    
    embedContainers.forEach(container => {
      const notebookUrl = container.dataset.notebook;
      const repoUrl = container.dataset.repo;
      
      if (notebookUrl) {
        this.embedNotebook(container, notebookUrl, repoUrl);
      }
    });
  }

  embedNotebook(container, notebookUrl, repoUrl) {
    // Create loading state
    container.innerHTML = `
      <div class="notebook-loading">
        <div class="loading-spinner"></div>
        <p>Loading notebook...</p>
      </div>
    `;

    // Fetch notebook content
    fetch(notebookUrl)
      .then(response => response.json())
      .then(notebook => {
        this.renderNotebook(container, notebook, repoUrl);
      })
      .catch(error => {
        container.innerHTML = `
          <div class="notebook-error">
            <p>Failed to load notebook. Please check the URL.</p>
            <a href="${notebookUrl}" target="_blank" class="btn btn-primary">View on GitHub</a>
          </div>
        `;
      });
  }

  renderNotebook(container, notebook, repoUrl) {
    let html = '<div class="notebook-content">';
    
    notebook.cells.forEach((cell, index) => {
      if (cell.cell_type === 'markdown') {
        html += this.renderMarkdownCell(cell);
      } else if (cell.cell_type === 'code') {
        html += this.renderCodeCell(cell, index);
      }
    });
    
    html += '</div>';
    
    // Add source link
    if (repoUrl) {
      html += `
        <div class="notebook-source">
          <a href="${repoUrl}" target="_blank" class="btn btn-secondary">
            <i class="fab fa-github"></i> View Source
          </a>
        </div>
      `;
    }
    
    container.innerHTML = html;
  }

  renderMarkdownCell(cell) {
    // Simple markdown rendering (you might want to use a proper markdown parser)
    let content = cell.source.join('');
    
    // Basic markdown to HTML conversion
    content = content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`(.*)`/gim, '<code>$1</code>');
    
    return `<div class="notebook-markdown">${content}</div>`;
  }

  renderCodeCell(cell, index) {
    const source = cell.source.join('');
    const outputs = cell.outputs || [];
    
    let html = `
      <div class="notebook-code-cell" data-cell-index="${index}">
        <div class="code-input">
          <pre><code class="language-python">${this.escapeHtml(source)}</code></pre>
        </div>
    `;
    
    if (outputs.length > 0) {
      html += '<div class="code-output">';
      outputs.forEach(output => {
        if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
          if (output.data && output.data['text/html']) {
            html += `<div class="output-html">${output.data['text/html'].join('')}</div>`;
          } else if (output.data && output.data['text/plain']) {
            html += `<div class="output-text"><pre>${output.data['text/plain'].join('')}</pre></div>`;
          }
        } else if (output.output_type === 'stream') {
          html += `<div class="output-stream"><pre>${output.text.join('')}</pre></div>`;
        }
      });
      html += '</div>';
    }
    
    html += '</div>';
    return html;
  }

  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new NotebookEmbedder();
}); 
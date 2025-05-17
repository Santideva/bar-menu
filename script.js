// script.js
fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('menu');

    data.categories.forEach(category => {
      // 1) Render the category heading
      const section = document.createElement('section');
      section.className = 'category';
      section.innerHTML = `<h2>${category.name}</h2>`;
      
      // 2) Render each item
      category.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item';
        
        // Build name + optional description
        let html = `<div class="name">${item.name}</div>`;
        if (item.description) {
          html += `<div class="desc">${item.description}</div>`;
        }
        
        // Extract just the keys inside item.prices
        const measures = Object.keys(item.prices);
        
        if (measures.length === 1 && measures[0] === 'price') {
          // Single-price case → show only the number
          html += `<div class="price">₹${item.prices.price.toFixed(2)}</div>`;
        } else {
          // Multi-price case → build a small table
          html += `<table class="price-table"><thead><tr>`;
          measures.forEach(m => {
            html += `<th>${m.toUpperCase()}</th>`;    // e.g. "30ML" / "60ML"
          });
          html += `</tr></thead><tbody><tr>`;
          measures.forEach(m => {
            html += `<td>₹${item.prices[m].toFixed(2)}</td>`;
          });
          html += `</tr></tbody></table>`;
        }
        
        card.innerHTML = html;
        section.appendChild(card);
      });
      
      container.appendChild(section);
    });
  })
  .catch(err => {
    console.error('Menu load error:', err);
    document.getElementById('menu').textContent = 'Sorry, menu unavailable.';
  });

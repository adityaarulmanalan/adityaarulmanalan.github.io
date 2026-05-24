const rootPath = location.pathname.includes('/case-studies/') ? '../' : '';
document.body.insertAdjacentHTML('afterbegin', `
  <div class="grain"></div>
  <div class="progress"></div>
  <div class="cursor"></div>
  <div class="dot"></div>
  <header class="nav">
    <a class="brand" href="${rootPath}index.html">ADITYA<b>.</b></a>
    <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">
      <span></span><span></span>
    </button>
    <nav id="site-menu" aria-label="Primary navigation">
      <a class="magnetic" href="${rootPath}index.html">Home</a>
      <a class="magnetic" href="${rootPath}work.html">Work</a>
      <a class="magnetic" href="${rootPath}index.html#resume">Resume</a>
      <a class="magnetic" href="${rootPath}contact.html">Contact</a>
    </nav>
    <a class="nav-meta magnetic" href="${rootPath}work.html">UI/UX · ECE · 2026</a>
  </header>`);
document.body.insertAdjacentHTML('beforeend', `
  <footer class="footer">
    <div class="footer-tag">Available for UI/UX internships</div>
    <div class="footer-word">ADITYA ARUL MANALAN</div>
    <div class="footer-grid">
      <p>Interface design, visual hierarchy, product storytelling, and smooth interaction details.</p>
      <div><span class="mini-label">Pages</span><a href="${rootPath}work.html">Work</a><a href="${rootPath}index.html#resume">Resume</a><a href="${rootPath}contact.html">Contact</a></div>
      <div><span class="mini-label">Contact</span><a href="mailto:aditya.arulmanalan@gmail.com" target="_blank" rel="noopener noreferrer" >Email</a><a href="https://www.linkedin.com/in/adityaarulmanalan/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
    </div>
  </footer>`);

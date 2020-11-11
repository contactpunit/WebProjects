const toc = document.querySelector('#table-of-contents')
const allH2 = document.querySelectorAll('h2');
if (allH2.length > 0) {
    toc.innerHTML = 
        '<h2>Table of Contents</h2>' + 
        '<ol>' +
        Array.prototype.slice.call(allH2).map(heading => {
            return '<li><a href="#' + heading.id + '">' + heading.textContent + '</a></li>';
        }).join('');
        + '</ol>'
}
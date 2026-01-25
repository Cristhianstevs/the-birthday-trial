/* ======================================= */
/*         ANIMATION_TEXT_WHRITING         */
/* ======================================= */


function iniciarEscrita() {
    const container = document.getElementById("meuTexto");
    if (!container) return;
    
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    
    const textos = textNodes.map(node => node.textContent);
    textNodes.forEach(node => node.textContent = "");
    
    let nodeIndex = 0;
    let charIndex = 0;
    
    const PASSO = 6;
    
    function escrever() {
        if (nodeIndex >= textNodes.length) return;
        
        const textoAtual = textos[nodeIndex];
        const proximoChunk = textoAtual.slice(charIndex, charIndex + PASSO);
        
        textNodes[nodeIndex].textContent += proximoChunk;
        charIndex += PASSO;
        
        if (charIndex >= textoAtual.length) {
            nodeIndex++;
            charIndex = 0;
        }
        
        requestAnimationFrame(escrever);
    }
    
    escrever();
}

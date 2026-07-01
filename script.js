// Array para armazenar produtos
let products = [];
let barcodeReader = null;
let lastDetectedBarcode = '';

// ============ LEITOR DE CÓDIGO DE BARRAS ============

// Alternar leitor de código de barras
function toggleBarcodeReader() {
    const container = document.getElementById('barcodeReaderContainer');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        startBarcodeReader();
    } else {
        container.style.display = 'none';
        stopBarcodeReader();
    }
}

// Fechar leitor de código de barras
function closeBarcodeReader() {
    const container = document.getElementById('barcodeReaderContainer');
    container.style.display = 'none';
    stopBarcodeReader();
}

// Iniciar o leitor de código de barras
function startBarcodeReader() {
    try {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#camera'),
                constraints: {
                    width: 500,
                    height: 400,
                    facingMode: "environment"
                }
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader"
                ],
                debug: {
                    showCanvas: true,
                    showPatterns: true,
                    showFrequency: false,
                    showLines: true
                }
            }
        }, function(err) {
            if (err) {
                console.error("Erro ao iniciar leitor de código de barras:", err);
                alert('Erro ao acessar a câmera. Verifique as permissões.');
                closeBarcodeReader();
                return;
            }

            Quagga.start();

            // Detectar código de barras
            Quagga.onDetected(function(data) {
                if (data && data.codeResult && data.codeResult.code) {
                    const detectedCode = data.codeResult.code;
                    
                    // Evitar duplicatas consecutivas
                    if (detectedCode !== lastDetectedBarcode) {
                        lastDetectedBarcode = detectedCode;
                        
                        // Mostrar resultado
                        document.getElementById('detectedCode').textContent = detectedCode;
                        document.getElementById('barcodeResult').style.display = 'block';
                        
                        // Som de sucesso
                        playBeep();
                    }
                }
            });
        });
    } catch (error) {
        console.error("Erro:", error);
        alert('Erro ao iniciar o leitor de código de barras.');
    }
}

// Parar o leitor de código de barras
function stopBarcodeReader() {
    try {
        if (Quagga) {
            Quagga.stop();
            lastDetectedBarcode = '';
        }
    } catch (error) {
        console.error("Erro ao parar leitor:", error);
    }
}

// Usar código de barras detectado
function useDetectedBarcode() {
    const code = document.getElementById('detectedCode').textContent.trim();
    
    if (code) {
        // Preencher campo de código
        document.getElementById('codigo').value = code;
        document.getElementById('codigo').focus();
        
        // Fechar leitor
        closeBarcodeReader();
        
        // Mostrar mensagem
        alert(`✅ Código ${code} adicionado ao campo!`);
    }
}

// Cancelar código detectado
function cancelBarcode() {
    document.getElementById('barcodeResult').style.display = 'none';
    document.getElementById('detectedCode').textContent = '';
    lastDetectedBarcode = '';
}

// Som de beep ao detectar código
function playBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ============ FIM LEITOR DE CÓDIGO DE BARRAS ============

// Adicionar produto
function addProduct(event) {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const descricao = document.getElementById('descricao').value.trim();
    const preco = parseFloat(document.getElementById('preco').value) || 0;

    // Validação
    if (!codigo || !quantidade || !descricao) {
        alert('Por favor, preencha código, quantidade e descrição!');
        return;
    }

    // Criar objeto do produto
    const product = {
        id: Date.now(),
        codigo: codigo,
        quantidade: quantidade,
        descricao: descricao,
        preco: preco
    };

    // Adicionar ao array
    products.push(product);

    // Limpar formulário
    document.getElementById('productForm').reset();

    // Atualizar tabela e cálculos
    updateTable();
    updateCalculations();

    // Foco no primeiro campo
    document.getElementById('codigo').focus();
}

// Calcular subtotal
function calculateSubtotal(quantity, price) {
    return quantity * price;
}

// Formatar moeda
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Atualizar cálculos
function updateCalculations() {
    const totalQuantity = products.reduce((sum, p) => sum + p.quantidade, 0);
    const totalValue = products.reduce((sum, p) => sum + calculateSubtotal(p.quantidade, p.preco), 0);
    const productCount = products.length;

    document.getElementById('totalQuantity').textContent = totalQuantity;
    document.getElementById('totalValue').textContent = formatCurrency(totalValue);
    document.getElementById('productCount').textContent = productCount;
}

// Atualizar tabela
function updateTable() {
    const tbody = document.getElementById('tbody');
    const emptyMessage = document.getElementById('emptyMessage');

    // Limpar tabela
    tbody.innerHTML = '';

    if (products.length === 0) {
        emptyMessage.classList.add('show');
        document.getElementById('tableContainer').style.display = 'block';
        return;
    }

    emptyMessage.classList.remove('show');

    // Adicionar linhas
    products.forEach(product => {
        const subtotal = calculateSubtotal(product.quantidade, product.preco);
        const priceDisplay = product.preco > 0 ? `R$ ${formatCurrency(product.preco)}` : '—';
        const subtotalDisplay = product.preco > 0 ? `R$ ${formatCurrency(subtotal)}` : '—';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${product.codigo}</strong></td>
            <td>${product.quantidade}</td>
            <td>${product.descricao}</td>
            <td>${priceDisplay}</td>
            <td><strong>${subtotalDisplay}</strong></td>
            <td>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                    🗑️ Deletar
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Deletar produto
function deleteProduct(id) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        products = products.filter(p => p.id !== id);
        updateTable();
        updateCalculations();
    }
}

// Exportar para Excel
function exportToExcel() {
    if (products.length === 0) {
        alert('Nenhum produto para exportar!');
        return;
    }

    // Criar array de dados
    const data = [
        ['CÓDIGO', 'QUANTIDADE', 'DESCRIÇÃO', 'PREÇO UNITÁRIO', 'SUBTOTAL']
    ];

    let totalQty = 0;
    let totalValue = 0;

    products.forEach(product => {
        const subtotal = calculateSubtotal(product.quantidade, product.preco);
        totalQty += product.quantidade;
        totalValue += subtotal;

        data.push([
            product.codigo,
            product.quantidade,
            product.descricao,
            product.preco > 0 ? product.preco : '',
            product.preco > 0 ? subtotal : ''
        ]);
    });

    // Adicionar linhas de resumo
    data.push(['', '', '', '', '']);
    data.push(['RESUMO', '', '', '', '']);
    data.push(['Total de Itens', totalQty, '', '', '']);
    data.push(['Valor Total', '', '', '', totalValue > 0 ? totalValue : '']);
    data.push(['Produtos', products.length, '', '', '']);

    // Criar workbook
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    
    // Ajustar largura das colunas
    worksheet['!cols'] = [
        { wch: 20 },
        { wch: 15 },
        { wch: 30 },
        { wch: 18 },
        { wch: 15 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventário');

    // Gerar nome do arquivo com data/hora
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0];
    const filename = `inventario_${timestamp}.xlsx`;

    // Baixar arquivo
    XLSX.writeFile(workbook, filename);
}

// Exportar para TXT
function exportToTxt() {
    if (products.length === 0) {
        alert('Nenhum produto para exportar!');
        return;
    }

    let content = '╔════════════════════════════════════════════════════════════════════════╗\n';
    content += '║                 RELATÓRIO DE INVENTÁRIO                                 ║\n';
    content += '╚════════════════════════════════════════════════════════════════════════╝\n\n';

    // Data e hora
    const now = new Date();
    const dataFormatada = now.toLocaleDateString('pt-BR');
    const horaFormatada = now.toLocaleTimeString('pt-BR');
    content += `Data: ${dataFormatada}\n`;
    content += `Hora: ${horaFormatada}\n`;
    content += '─'.repeat(72) + '\n\n';

    // Cabeçalho da tabela
    content += '┌──────────────────┬────────┬──────────────────────────┬─────────────┬──────────────┐\n';
    content += '│ CÓDIGO           │ QUANT. │ DESCRIÇÃO                │ PREÇO UNIT. │ SUBTOTAL     │\n';
    content += '├──────────────────┼────────┼──────────────────────────┼─────────────┼──────────────┤\n';

    // Adicionar dados
    let totalQty = 0;
    let totalValue = 0;

    products.forEach((product) => {
        const subtotal = calculateSubtotal(product.quantidade, product.preco);
        totalQty += product.quantidade;
        totalValue += subtotal;

        const codigo = String(product.codigo).padEnd(16);
        const quantidade = String(product.quantidade).padEnd(6);
        const descricao = product.descricao.substring(0, 24).padEnd(24);
        const preco = product.preco > 0 ? `R$ ${formatCurrency(product.preco)}`.padEnd(11) : '—'.padEnd(11);
        const subtotalStr = product.preco > 0 ? `R$ ${formatCurrency(subtotal)}`.padEnd(12) : '—'.padEnd(12);
        
        content += `│ ${codigo} │ ${quantidade} │ ${descricao} │ ${preco} │ ${subtotalStr} │\n`;
    });

    content += '├──────────────────┼────────┼──────────────────────────┼─────────────┼──────────────┤\n';
    content += `│ TOTAL            │ ${String(totalQty).padEnd(6)} │                          │             │ R$ ${formatCurrency(totalValue).padEnd(8)} │\n`;
    content += '└──────────────────┴────────┴──────────────────────────┴─────────────┴──────────────┘\n\n';

    // Resumo
    content += `Total de produtos: ${products.length}\n`;
    content += `Quantidade total: ${totalQty} unidades\n`;
    if (totalValue > 0) {
        content += `Valor total: R$ ${formatCurrency(totalValue)}\n`;
    }
    content += `\n`;

    // Rodapé
    content += '═'.repeat(72) + '\n';
    content += 'Gerado por: Gerenciador de Inventário com Cálculos\n';
    content += 'Fim do relatório\n';

    // Criar blob e baixar
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const now2 = new Date();
    const timestamp = now2.toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `inventario_${timestamp}.txt`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Limpar tudo
function clearAll() {
    if (products.length === 0) {
        alert('Não há nada para limpar!');
        return;
    }

    if (confirm('Tem certeza que deseja DELETAR TODOS os produtos? Esta ação não pode ser desfeita!')) {
        products = [];
        updateTable();
        updateCalculations();
        alert('Todos os produtos foram deletados!');
    }
}

// Suporte a Enter no formulário
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('descricao').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('productForm').dispatchEvent(new Event('submit'));
        }
    });

    // Inicializar tabela vazia e cálculos
    updateTable();
    updateCalculations();
});

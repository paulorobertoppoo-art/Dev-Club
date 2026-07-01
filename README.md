# Gerenciador de Inventário 📦

Um site completo para gerenciar produtos com código, quantidade, descrição e preço, com cálculos automáticos e exportação em Excel e TXT.

## 🎯 Características

✨ **Funcionalidades principais:**
- ✅ Adicionar produtos com código, quantidade, descrição e **preço unitário**
- ✅ **📱 Leitor de código de barras com câmera** (suporta múltiplos formatos)
- ✅ Visualizar todos os produtos em uma tabela elegante
- ✅ **Cálculos automáticos** de subtotais (Quantidade × Preço)
- ✅ **Soma total de quantidade** de todos os produtos
- ✅ **Soma total de valor** considerando todos os subtotais
- ✅ Deletar produtos individuais
- ✅ **Exportar para Excel (.xlsx)** com cálculos
- ✅ **Exportar para TXT** com formatação em tabela ASCII
- ✅ Interface responsiva (desktop, tablet e mobile)
- ✅ Design moderno com gradientes

## 📥 Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. Preencha o formulário com:
   - **Código**: Identificação do produto (ex: SKU123 ou 001)
   - **Quantidade**: Número de unidades (ex: 10)
   - **Descrição**: Nome ou descrição do produto (ex: Produto ABC)
   - **Preço Unitário** (opcional): Valor de cada unidade (ex: 10.50)
3. Clique em "✚ Adicionar Produto"
4. Veja seus produtos listados na tabela com subtotais calculados automaticamente

### 📱 Usando o Leitor de Código de Barras

1. Clique no botão "📱 Ativar Leitor"
2. Autorize o acesso à câmera do dispositivo
3. Aponte a câmera para o código de barras
4. O código será detectado automaticamente (múltiplos formatos suportados)
5. Clique em "✓ Usar este código" para preenchê-lo no formulário
6. Ou clique em "✕ Cancelar" para descartar
7. Clique em "✕ Fechar Leitor" para parar o leitor

**Formatos suportados:**
- EAN (EAN-13, EAN-8)
- Code 128
- Code 39
- UPC (UPC-A, UPC-E)
- Codabar
- Interleaved 2 of 5

## 🧮 Operações Quantitativas

### Cálculos Automáticos
- **Total de Itens**: Soma de todas as quantidades
- **Valor Total**: Soma de todos os subtotais (Qtd × Preço)
- **Contagem de Produtos**: Número de produtos únicos

## 📸 Leitor de Código de Barras

Tecnologia avançada para ler códigos de barras em tempo real:

- **Câmera em tempo real**: Captura contínua do feed da câmera
- **Detecção automática**: Identifica códigos automaticamente
- **Som de alerta**: Beep ao detectar um código
- **Múltiplos formatos**: Suporta EAN, Code 128, Code 39, UPC, Codabar e mais
- **Integração automática**: Preenche o campo de código diretamente
- **Responsivo**: Funciona em smartphones e tablets

### Como Funciona
1. Ativa o leitor por câmera
2. Aponta para o código de barras
3. Sistema detecta automaticamente
4. Confirma ou cancela o uso do código
5. Campo é preenchido automaticamente

## 💾 Exportação

### Excel (.xlsx)
- Tabela formatada com todas as colunas
- Incluindo: Código, Quantidade, Descrição, Preço e Subtotal
- Seção de resumo com totais
- Nome do arquivo com data automática

### TXT
- Tabela formatada em ASCII com bordas
- Data e hora de geração
- Cálculos totais e resumo
- Rodapé informativo
- Nome do arquivo com data

## 🗂️ Estrutura de Arquivos

```
├── index.html      # Estrutura HTML com formulário e tabela
├── style.css       # Estilos responsivos e design moderno
├── script.js       # Lógica de gerenciamento, cálculos e exportação
└── README.md       # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Flexbox, Grid, Gradients, Responsivo
- **JavaScript** - Lógica interativa (Vanilla JS)
- **SheetJS (XLSX)** - Exportação para Excel
- **Blobs** - Exportação para TXT
- **Quagga2** - Detecção de código de barras com câmera

### Requisitos para Leitor de Código de Barras
- Navegador moderno com suporte a WebRTC
- Permissão de acesso à câmera do dispositivo
- Boa iluminação para melhor detecção

## 📊 Exemplo de Uso

### Adição Manual
```
Código: 5901234123457
Quantidade: 10
Descrição: Camiseta Azul
Preço: 25.00

Subtotal: 250.00
Total de itens: 10
Valor total: 250.00
```

### Adição via Leitor de Código de Barras
```
1. Clica em "📱 Ativar Leitor"
2. Aponta câmera para código de barras
3. Sistema detecta: 5901234123457 ✓
4. Clica em "Usar este código"
5. Campo preenchido automaticamente
6. Preenche quantidade, descrição e preço
7. Clica "✚ Adicionar Produto"
```

## 💾 Dados Locais

Os dados são armazenados apenas na memória do navegador durante a sessão. Para preservar dados, exporte-os em Excel ou TXT.

## 📱 Compatibilidade

✅ **Compatibilidade com o Leitor de Código de Barras:**
- ✅ Chrome/Chromium 56+
- ✅ Firefox 55+
- ✅ Safari 14.1+ (com HTTPS)
- ✅ Edge 79+
- ✅ Android Chrome/Firefox
- ✅ iOS Safari 14.7+

⚠️ **Nota:** O leitor de código de barras requer:
- Conexão HTTPS (em produção)
- Permissão de acesso à câmera
- Navegador com suporte a WebRTC

## 🎯 Casos de Uso

- 📦 Gerenciamento de estoque com leitor de código de barras
- 📋 Controle de inventário rápido via câmera
- 🏪 Catálogo de produtos com preços e código de barras
- 📊 Relatórios de inventário e vendas
- 🛒 Gestão de armazém com scanner portátil
- 💼 Controle de compras em lote
- 🚚 Recebimento de mercadorias (leitura rápida de códigos)

## 🎨 Personalização

Você pode personalizar as cores e estilos editando `style.css`:

- **Cor do tema**: Mude o gradiente em `body` background
- **Cores dos botões**: Ajuste em `.btn-excel`, `.btn-txt`, `.btn-clear`
- **Tamanho de fonte**: Modifique `font-size` nos seletores
- **Paleta de cores**: Altere os valores hex nas seções de gradientes

## 📋 Próximas Melhorias Possíveis

- 💾 Salvar dados localmente (localStorage)
- 📊 Gráficos e estatísticas avançadas
- 🔍 Busca e filtros por código/descrição
- 📱 Importar dados de Excel
- 🎨 Temas diferentes
- 🌐 Sincronização em nuvem
- ➕ Cálculos avançados (margem de lucro, descontos)
- 📸 Historico de códigos lidos

## 🆘 Resolução de Problemas

### Leitor de Código de Barras não funciona
- Verifique se o navegador suporta WebRTC
- Autorize o acesso à câmera quando solicitado
- Teste em um navegador diferente
- Certifique-se de ter boa iluminação

### Câmera não abre
- Verificar permissões do sistema operacional
- Desabilitar outras aplicações usando a câmera
- Recarregar a página
- Usar HTTPS (alguns navegadores exigem)

### Código não é detectado
- Melhorar a iluminação
- Aproximar a câmera do código
- Manter o código reto e paralelo à câmera
- Tentar diferentes ângulos

Desenvolvido com ❤️ para facilitar o gerenciamento de inventário com cálculos!

## 💡 Dicas para Melhor Uso do Leitor

1. **Iluminação**: Use boa iluminação natural ou artificial
2. **Distância**: Mantenha 10-20cm de distância do código
3. **Ângulo**: Alinhe a câmera paralela ao código
4. **Estabilidade**: Segure o dispositivo firme
5. **Qualidade**: Códigos claros e sem danos funcionam melhor
6. **Velocidade**: Não mova muito rápido a câmera
7. **Ambiente**: Evite reflexos e sombras no código

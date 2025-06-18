
import prompt from 'prompt-sync';
const ler = prompt();

// Lista que armazenará os produtos cadastrados
let produtos = [];

// Subcategorias disponíveis para os produtos
const subcategorias = [
    "📚 Material Escolar",
    "🗂️ Papelaria em Geral",
    "🎨 Artes e Escritório",
    "🎁 Decoração e Embalagens",
    "📦 Outros" 
];

// Função que lê um número positivo e faz a validação
function lerNumeroPositivo(mensagem) {
    const entrada = ler(mensagem);
    const numero = Number(entrada);
    if (isNaN(numero) || numero < 0) {
        console.log("⚠️ Por favor, insira um número válido e positivo.");
        return null;
    }
    return numero;
}

// Função que permite o usuário escolher uma subcategoria
function escolherSubcategoria() {
    console.log("🔽 Escolha a subcategoria do produto:");
    for (let i = 0; i < subcategorias.length; i++) {
        console.log(`${i + 1} - ${subcategorias[i]}`);
    }
    const escolha = lerNumeroPositivo("📌 Digite o número da subcategoria: ");
    if (escolha === null || escolha < 1 || escolha > subcategorias.length) {
        console.log("❌ Subcategoria inválida. Tente novamente.");
        return null;
    }
    return subcategorias[escolha - 1];
}

// Função para cadastrar um novo produto no estoque
function cadastrarProduto() {
    const subcategoria = escolherSubcategoria();
    if (subcategoria === null) return;

    const id = produtos.length + 1; // Gera ID automático
    const nome = ler("📝 Digite o nome do produto: ").trim();
    if (!nome) {
        console.log("⚠️ O nome do produto não pode ser vazio.");
        return;
    }

    const preco = lerNumeroPositivo("💰 Digite o preço do produto (R$): ");
    if (preco === null) return;

    const quantidade = lerNumeroPositivo("📦 Digite a quantidade inicial em estoque: ");
    if (quantidade === null) return;

    // Cria o objeto produto
    const novoProduto = { id, nome, preco, quantidade, subcategoria };
    produtos.push(novoProduto); // Adiciona à lista

    console.log(`✅ Produto cadastrado com sucesso na subcategoria "${subcategoria}"!`);
}

// Função para exibir todos os produtos cadastrados
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("📭 Nenhum produto cadastrado ainda.");
        return;
    }
    console.log("\n📋 === Lista de Produtos ===");
    for (const produto of produtos) {
        const total = (produto.preco * produto.quantidade).toFixed(2); // Valor total
        console.log(`🆔 ID: ${produto.id} | 🏷️ Nome: ${produto.nome} | 💰 Preço: R$${produto.preco.toFixed(2)} | 📦 Estoque: ${produto.quantidade} | 🗂️ Subcategoria: ${produto.subcategoria} | 📊 Total: R$${total}`);
    }
}

// Função para adicionar unidades a um produto
function adicionarEstoque() {
    const id = lerNumeroPositivo("➕ Digite o ID do produto para adicionar estoque: ");
    if (id === null) return;

    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        console.log("❌ Produto não encontrado.");
        return;
    }

    const quantidade = lerNumeroPositivo("📦 Quantidade a adicionar: ");
    if (quantidade === null || quantidade === 0) {
        console.log("⚠️ Quantidade inválida.");
        return;
    }

    produto.quantidade += quantidade;
    console.log("✅ Estoque atualizado com sucesso.");
}

// Função para retirar unidades do estoque
function retirarEstoque() {
    const id = lerNumeroPositivo("➖ Digite o ID do produto para retirar do estoque: ");
    if (id === null) return;

    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        console.log("❌ Produto não encontrado.");
        return;
    }

    const quantidade = lerNumeroPositivo("📦 Quantidade a retirar: ");
    if (quantidade === null || quantidade === 0) {
        console.log("⚠️ Quantidade inválida.");
        return;
    }

    if (quantidade > produto.quantidade) {
        console.log("❌ Estoque insuficiente para retirada.");
        return;
    }

    produto.quantidade -= quantidade;
    console.log("✅ Estoque atualizado após retirada.");
}

// Função para apagar um produto pelo ID
function apagarProduto() {
    const id = lerNumeroPositivo("🗑️ Digite o ID do produto para apagar: ");
    if (id === null) return;

    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        console.log("❌ Produto não encontrado.");
        return;
    }

    produtos.splice(index, 1); // Remove o produto
    console.log("🗑️ Produto removido com sucesso.");
}

// Função para buscar produtos por nome (parcial ou completo)
function buscarProduto() {
    const nome = ler("🔍 Digite o nome do produto a buscar: ").toLowerCase();
    const encontrados = produtos.filter(p => p.nome.toLowerCase().includes(nome));
    
    if (encontrados.length === 0) {
        console.log("❌ Nenhum produto encontrado com esse nome.");
        return;
    }

    console.log("🔎 Produtos encontrados:");
    for (const produto of encontrados) {
        console.log(`🆔 ID: ${produto.id} | 🏷️ Nome: ${produto.nome} | Estoque: ${produto.quantidade}`);
    }
}

// Função que exibe um resumo geral do estoque
function resumoEstoque() {
    let totalProdutos = produtos.length;
    let totalUnidades = produtos.reduce((soma, p) => soma + p.quantidade, 0);
    let valorTotal = produtos.reduce((soma, p) => soma + p.preco * p.quantidade, 0);

    console.log("\n📊 === Resumo do Estoque ===");
    console.log(`📦 Total de produtos: ${totalProdutos}`);
    console.log(`📦 Total de unidades em estoque: ${totalUnidades}`);
    console.log(`💰 Valor total estimado em estoque: R$${valorTotal.toFixed(2)}`);
}

// Função que remove todos os produtos (com confirmação)
function limparProdutos() {
    const confirm = ler("⚠️ Tem certeza que deseja apagar TODOS os produtos? (sim/não): ").toLowerCase();
    if (confirm === "sim") {
        produtos = []; // Limpa a lista
        console.log("🧹 Todos os produtos foram removidos!");
    } else {
        console.log("❎ Ação cancelada.");
    }
}

// Função principal que exibe o menu e controla o fluxo do programa
function menu() {
    let opcao = "";
    do {
        console.log("\n📦 === MENU DE CONTROLE DE ESTOQUE ===");
        console.log("1 - 🆕 Cadastrar produto");
        console.log("2 - 📋 Listar produtos");
        console.log("3 - ➕ Adicionar ao estoque");
        console.log("4 - ➖ Retirar do estoque");
        console.log("5 - 🗑️ Apagar produto");
        console.log("6 - 🔍 Buscar produto por nome");
        console.log("7 - 📊 Ver resumo do estoque");
        console.log("8 - 🧹 Limpar todos os produtos");
        console.log("0 - 🚪 Sair");
        opcao = ler("👉 Escolha uma opção: ").trim();

        // Verifica qual opção o usuário escolheu e chama a função correspondente
        if (opcao === "1") cadastrarProduto();
        else if (opcao === "2") listarProdutos();
        else if (opcao === "3") adicionarEstoque();
        else if (opcao === "4") retirarEstoque();
        else if (opcao === "5") apagarProduto();
        else if (opcao === "6") buscarProduto();
        else if (opcao === "7") resumoEstoque();
        else if (opcao === "8") limparProdutos();
        else if (opcao === "0") console.log("👋 Encerrando o programa. Até breve!");
        else console.log("❌ Opção inválida. Tente novamente.");

    } while (opcao !== "0"); // Continua até o usuário escolher sair
}

// Inicia o programa
menu();
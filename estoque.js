import prompt from 'prompt-sync';
const ler = prompt();

let produtos = [];

const subcategorias = [
    "Material Escolar",
    "Papelaria em Geral",
    "Artes e Escritório",
    "Decoração e Embalagens",
    "Outros"
];

// Função para ler um número positivo, retorna null se inválido
function lerNumeroPositivo(mensagem) {
    const entrada = ler(mensagem);
    const numero = Number(entrada);
    if (isNaN(numero) || numero < 0) {
        console.log("Por favor, insira um número válido e positivo.");
        return null;
    }
    return numero;
}

// Função para escolher subcategoria do produto
function escolherSubcategoria() {
    console.log("Escolha a subcategoria do produto:");
    for (let i = 0; i < subcategorias.length; i++) {
        console.log(`${i + 1} - ${subcategorias[i]}`);
    }
    const escolha = lerNumeroPositivo("Digite o número da subcategoria: ");
    if (escolha === null || escolha < 1 || escolha > subcategorias.length) {
        console.log("Subcategoria inválida. Tente novamente.");
        return null;
    }
    return subcategorias[escolha - 1];
}

// Função para cadastrar um produto novo dentro de uma subcategoria
function cadastrarProduto() {
    const subcategoria = escolherSubcategoria();
    if (subcategoria === null) return;

    const id = produtos.length + 1;
    const nome = ler("Digite o nome do produto: ").trim();
    if (!nome) {
        console.log("O nome do produto não pode ser vazio.");
        return;
    }
    const preco = lerNumeroPositivo("Digite o preço do produto (R$): ");
    if (preco === null) return;
    const quantidade = lerNumeroPositivo("Digite a quantidade inicial em estoque: ");
    if (quantidade === null) return;

    const novoProduto = {
        id,
        nome,
        preco,
        quantidade,
        subcategoria
    };

    produtos.push(novoProduto);
    console.log(`Produto cadastrado com sucesso na subcategoria "${subcategoria}"!`);
}

// Função para listar todos os produtos cadastrados
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado ainda.");
        return;
    }
    console.log("\n=== Lista de Produtos ===");
    for (const produto of produtos) {
        console.log(`ID: ${produto.id} | Nome: ${produto.nome} | Preço: R$${produto.preco.toFixed(2)} | Estoque: ${produto.quantidade} | Subcategoria: ${produto.subcategoria}`);
    }
}

// Função para adicionar estoque a um produto existente
function adicionarEstoque() {
    const id = lerNumeroPositivo("Digite o ID do produto para adicionar estoque: ");
    if (id === null) return;

    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    const quantidade = lerNumeroPositivo("Digite a quantidade a adicionar: ");
    if (quantidade === null || quantidade === 0) {
        console.log("Quantidade inválida para adicionar.");
        return;
    }

    produto.quantidade += quantidade;
    console.log("Estoque atualizado com sucesso.");
}

// Função para retirar estoque de um produto
function retirarEstoque() {
    const id = lerNumeroPositivo("Digite o ID do produto para retirar do estoque: ");
    if (id === null) return;

    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    const quantidade = lerNumeroPositivo("Digite a quantidade a retirar: ");
    if (quantidade === null || quantidade === 0) {
        console.log("Quantidade inválida para retirar.");
        return;
    }

    if (quantidade > produto.quantidade) {
        console.log("Estoque insuficiente para essa retirada.");
        return;
    }

    produto.quantidade -= quantidade;
    console.log("Estoque atualizado após retirada.");
}

// Função para apagar um produto da lista
function apagarProduto() {
    const id = lerNumeroPositivo("Digite o ID do produto para apagar: ");
    if (id === null) return;

    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        console.log("Produto não encontrado.");
        return;
    }

    produtos.splice(index, 1);
    console.log("Produto removido com sucesso.");
}

// Função do menu principal que controla as opções sem usar switch
function menu() {
    let opcao = "";
    do {
        console.log("\n=== MENU DE CONTROLE DE ESTOQUE ===");
        console.log("1 - Cadastrar produto");
        console.log("2 - Listar produtos");
        console.log("3 - Adicionar ao estoque");
        console.log("4 - Retirar do estoque");
        console.log("5 - Apagar produto");
        console.log("0 - Sair");
        opcao = ler("Escolha uma opção: ").trim();

        if (opcao === "1") {
            cadastrarProduto();
        } else if (opcao === "2") {
            listarProdutos();
        } else if (opcao === "3") {
            adicionarEstoque();
        } else if (opcao === "4") {
            retirarEstoque();
        } else if (opcao === "5") {
            apagarProduto();
        } else if (opcao === "0") {
            console.log("Encerrando o programa. Até breve!");
        } else {
            console.log("Opção inválida. Tente novamente.");
        }
    } while (opcao !== "0");
}

// Inicia o programa
menu();



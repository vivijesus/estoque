import prompt from 'prompt-sync'
const ler = prompt();  

let produtos = [];

function cadastrarProduto() {
    const id = produtos.length + 1;
    const nome = ler(" Nome do produto: ");
    const preco = Number(ler("Preço do produto (R$): "));
    const quantidade = Number(ler("Quantidade inicial em estoque: "));

    const produto = {
        id,
        nome,
        preco,
        quantidade
    };

    produtos.push(produto);
    console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("\n Produtos cadastrados:");
    produtos.forEach(p => {
        console.log(`ID: ${p.id} | Nome: ${p.nome} | Preço: R$ ${p.preco.toFixed(2)} | Estoque: ${p.quantidade}`);
    });
}

function adicionarEstoque() {
    const id = Number(ler("ID do produto para adicionar ao estoque: "));
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        console.log(" Produto não encontrado.");
        return;
    }

    const quantidade = Number(ler("Quantidade a adicionar: "));
    produto.quantidade += quantidade;
    console.log("Estoque atualizado com sucesso.");
}

function retirarEstoque() {
    const id = Number(ler(" ID do produto para retirar do estoque: "));
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    const quantidade = Number(ler("Quantidade a retirar: "));

    if (quantidade > produto.quantidade) {
        console.log("Estoque insuficiente.");
    } else {
        produto.quantidade -= quantidade;
        console.log("Produto retirado do estoque.");
    }
}

function apagarProduto() {
    const id = Number(ler("ID do produto a ser apagado: "));
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        console.log("Produto não encontrado.");
    } else {
        produtos.splice(index, 1);
        console.log("Produto removido com sucesso.");
    }
}

function menu() {
    let opcao;

    do {
        console.log("\n ___PAPELARIA - CONTROLE DE ESTOQUE___");
        console.log("1. Cadastrar produto");
        console.log("2. Listar produtos");
        console.log("3. Adicionar ao estoque");
        console.log("4. Retirar do estoque");
        console.log("5. Apagar produto");
        console.log("0. Sair");
        opcao = ler ("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                cadastrarProduto();
                break;
            case "2":
                listarProdutos();
                break;
            case "3":
                adicionarEstoque();
                break;
            case "4":
                retirarEstoque();
                break;
            case "5":
                apagarProduto();
                break;
            case "0":
                console.log("Saindo do sistema. Até logo!");
                break;
            default:
                console.log("Opção inválida.");
        }

    } while (opcao !== "0");
}

menu();
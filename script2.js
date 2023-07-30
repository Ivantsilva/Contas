// Obtenha referências aos elementos do DOM
const expenseForm = document.getElementById("expenseForm");
const expenseTableBody = document.getElementById("expenseTableBody");
const totalAmount = document.getElementById("totalAmount");
const addExpenseButton = document.getElementById("addExpense");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Função para salvar as despesas no LocalStorage
function saveExpensesToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Função para adicionar uma linha de despesa na tabela
function addExpenseRow(data, local, cartao, valor) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${data}</td>
    <td>${local}</td>
    <td>${cartao}</td>
    <td>${valor.toFixed(2)}</td>
  `;
  expenseTableBody.appendChild(newRow);
}

// Função para calcular e exibir o total dos gastos
function updateTotal() {
  const total = expenses.reduce((acc, expense) => acc + expense.valor, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Evento de clique no botão "Adicionar Gasto"
addExpenseButton.addEventListener("click", () => {
  const data = document.getElementById("data").value;
  const local = document.getElementById("local").value;
  const cartao = document.getElementById("cartao").value;
  const valor = parseFloat(document.getElementById("valor").value);

  if (!data || !local || !cartao || isNaN(valor)) {
    return;
  }

  // Adicione o gasto ao array, salve no LocalStorage e atualize a tabela e o total
  expenses.push({ data, local, cartao, valor });
  saveExpensesToLocalStorage();
  addExpenseRow(data, local, cartao, valor);
  updateTotal();

  // Limpar campos do formulário
  expenseForm.reset();
});

// Carregar despesas do LocalStorage ao carregar a página
window.addEventListener("load", () => {
  expenses.forEach((expense) => {
    addExpenseRow(expense.data, expense.local, expense.cartao, expense.valor);
  });

  updateTotal();
});

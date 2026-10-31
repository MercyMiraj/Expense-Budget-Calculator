const form = document.getElementById('expense-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expenseList = document.getElementById('expense-list');
const totalSpentEl = document.getElementById('total-spent');
const budgetRemainingEl = document.getElementById('budget-remaining');

const BUDGET_LIMIT = 500.00;

// Load saved expenses from LocalStorage or start empty
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateUI() {
  expenseList.innerHTML = '';
  let totalSpent = 0;

  expenses.forEach((item, index) => {
    totalSpent += item.amount;

    const li = document.createElement('li');
    li.className = 'expense-item';
    li.innerHTML = `
      <div>
        <strong>${item.desc}</strong>
        <span class="tag">${item.category}</span>
      </div>
      <div>
        <span>$${item.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="removeExpense(${index})">✕</button>
      </div>
    `;
    expenseList.appendChild(li);
  });

  totalSpentEl.textContent = `$${totalSpent.toFixed(2)}`;
  const remaining = BUDGET_LIMIT - totalSpent;
  budgetRemainingEl.textContent = `$${remaining.toFixed(2)}`;

  localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newExpense = {
    desc: descInput.value,
    amount: parseFloat(amountInput.value),
    category: categoryInput.value
  };

  expenses.push(newExpense);
  updateUI();

  descInput.value = '';
  amountInput.value = '';
});

function removeExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}

// Initial render on load
updateUI();

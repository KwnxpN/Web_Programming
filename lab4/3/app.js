// Initial transactions from the image
const initialTransactions = [
    { date: '2024-12-01', description: 'เงินเดือน', income: 10000, expense: 0 },
    { date: '2024-12-02', description: 'ค่าหอพัก', income: 0, expense: 3500 },
    { date: '2024-12-02', description: 'ค่าไฟ-ค่าน้ำ', income: 0, expense: 800 },
    { date: '2024-12-10', description: 'ค่าแรงทำงานพิเศษ', income: 2500, expense: 0 },
    { date: '2024-12-15', description: 'ค่าอินเทอร์เน็ตรายเดือน', income: 0, expense: 350 }
];

let transactions = [...initialTransactions];

// Function to format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate and update total balance
function updateBalance() {
    const totalIncome = transactions.reduce((sum, trans) => sum + trans.income, 0);
    const totalExpense = transactions.reduce((sum, trans) => sum + trans.expense, 0);
    const balance = totalIncome - totalExpense;
    document.getElementById('totalBalance').textContent = formatNumber(balance);
}

// Render transactions table
function renderTransactions() {
    const tableBody = document.getElementById('transactionTable');
    tableBody.innerHTML = '';
    
    transactions.forEach(trans => {
        const row = document.createElement('tr');
        const dateFormatted = new Date(trans.date).toLocaleDateString('th-TH');
        
        row.innerHTML = `
            <td>${dateFormatted}</td>
            <td>${trans.description}</td>
            <td class="income">${trans.income ? formatNumber(trans.income) : '0'}</td>
            <td class="expense">${trans.expense ? formatNumber(trans.expense) : '0'}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    updateBalance();
}

// Add new transaction
function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const type = document.getElementById('type').value;
    const date = document.getElementById('transactionDate').value;
    
    if (!description || !amount || !date) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }
    
    const newTransaction = {
        date: date,
        description: description,
        income: type === 'income' ? amount : 0,
        expense: type === 'expense' ? amount : 0
    };
    
    transactions.push(newTransaction);
    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Clear form
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('transactionDate').value = '';
    
    renderTransactions();
}

// Initialize the table with sample data
document.addEventListener('DOMContentLoaded', () => {
    renderTransactions();
});
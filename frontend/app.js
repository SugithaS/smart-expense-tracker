// Dashboard scripts
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if(!token && window.location.pathname.includes('dashboard.html')){
        window.location.href = 'login.html';
    }

    if(window.location.pathname.includes('dashboard.html')){
        const expenseTable = document.querySelector('#expenseTable tbody');
        const ctx = document.getElementById('expenseChart').getContext('2d');
        let chart;

        const fetchExpenses = async () => {
            const res = await fetch('http://localhost:5000/api/expenses', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const expenses = await res.json();
            expenseTable.innerHTML = '';
            let dataByCategory = {};
            expenses.forEach(exp => {
                expenseTable.innerHTML += `<tr>
                    <td>${exp.title}</td>
                    <td>${exp.amount}</td>
                    <td>${exp.category}</td>
                    <td>${new Date(exp.date).toLocaleDateString()}</td>
                    <td><button onclick="deleteExpense('${exp._id}')">Delete</button></td>
                </tr>`;
                dataByCategory[exp.category] = (dataByCategory[exp.category] || 0) + exp.amount;
            });

            if(chart) chart.destroy();
            chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(dataByCategory),
                    datasets: [{ data: Object.values(dataByCategory), backgroundColor: ['#ff6384','#36a2eb','#cc65fe','#ffce56'] }]
                }
            });
        };

        fetchExpenses();

        document.getElementById('expenseForm').addEventListener('submit', async e => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const amount = document.getElementById('amount').value;
            const category = document.getElementById('category').value;
            await fetch('http://localhost:5000/api/expenses', {
                method: 'POST',
                headers: { 'Content-Type':'application/json','Authorization':'Bearer '+token },
                body: JSON.stringify({title, amount, category})
            });
            fetchExpenses();
        });

        window.deleteExpense = async (id) => {
            await fetch(`http://localhost:5000/api/expenses/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization':'Bearer '+token }
            });
            fetchExpenses();
        };

        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
});

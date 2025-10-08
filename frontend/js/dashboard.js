const API_URL = "http://localhost:5000/api/expenses";

const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

document.getElementById("username").textContent = localStorage.getItem("name");

document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const expense = {
    date: document.getElementById("date").value,
    category: document.getElementById("category").value,
    amount: parseFloat(document.getElementById("amount").value),
    description: document.getElementById("description").value,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(expense),
  });

  alert("✅ Expense added!");
  e.target.reset();
  loadExpenses();
});

async function loadExpenses() {
  const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();

  // Total Expense
  const total = data.reduce((acc, exp) => acc + exp.amount, 0);
  document.getElementById("totalAmount").textContent = total.toFixed(2);

  // Populate Calendar Table
  const tbody = document.getElementById("calendarBody");
  tbody.innerHTML = "";
  data.forEach(exp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${new Date(exp.date).toLocaleDateString()}</td>
                    <td>${exp.category}</td>
                    <td>$${exp.amount}</td>
                    <td>${exp.description}</td>`;
    tbody.appendChild(tr);
  });

  // Monthly Chart
  const monthlyData = Array.from({length:12}, (_,i)=>0);
  data.forEach(exp => {
    const month = new Date(exp.date).getMonth();
    monthlyData[month] += exp.amount;
  });

  const ctx1 = document.getElementById("monthlyChart").getContext("2d");
  if(window.monthChart) window.monthChart.destroy();
  window.monthChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        label: "Monthly Expenses",
        data: monthlyData,
        backgroundColor: "#ff7f50"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });

  // Annual Chart
  const annualTotals = {};
  data.forEach(exp => {
    const year = new Date(exp.date).getFullYear();
    annualTotals[year] = (annualTotals[year] || 0) + exp.amount;
  });
  const ctx2 = document.getElementById("annualChart").getContext("2d");
  if(window.annualChart) window.annualChart.destroy();
  window.annualChart = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: Object.keys(annualTotals),
      datasets: [{
        data: Object.values(annualTotals),
        backgroundColor: ["#36a2eb","#4bc0c0","#ff6384","#ffce56","#9966ff"]
      }]
    }
  });
}

// Initial load
loadExpenses();

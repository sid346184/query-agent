async function getFinancialData() {
    const ticker = document.getElementById("ticker").value;
    if (!ticker) {
        alert("Please enter a ticker.");
        return;
    }

    const response = await fetch("http://127.0.0.1:5000/api/financials", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ticker })
    });

    const data = await response.json();
    if (data.error) {
        alert("Error fetching data: " + data.error);
        return;
    }

    renderTable(data.balance_sheet, "Balance Sheet");
    renderTable(data.income_statement, "Income Statement");
    renderTable(data.cash_flow, "Cash Flow");
}

function renderTable(data, title) {
    let tableHTML = `<h3>${title}</h3><table><tr><th>Year</th><th>Data</th></tr>`;
    
    for (const year in data) {
        tableHTML += `<tr><td>${year}</td><td>${JSON.stringify(data[year], null, 2)}</td></tr>`;
    }

    tableHTML += "</table>";
    document.getElementById("financial-data").innerHTML += tableHTML;
}

# Query Agent

Query Agent is a web application that provides financial data for companies using a combination of yfinance, Flask, and a React frontend. This project is designed to fetch and display financial data for specified companies and answer user queries using the Groq API.

## Features

- Fetch financial data such as balance sheet, income statement, and cash flow for specified companies.
- Display summarized business information.
- Answer user queries about financial data using the Groq API.
- React frontend for interactive user experience.

## Installation

### Backend (Flask API)

1. Clone the repository:
   ```sh
   git clone https://github.com/sid346184/query-agent.git
   cd query-agent
   ```

2. Set up a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required packages:
   ```sh
   pip install -r requirements.txt
   ```

4. Run the Flask API:
   ```sh
   cd api
   flask run
   ```

### Frontend (React App)

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install the required packages:
   ```sh
   npm install
   ```

3. Start the React app:
   ```sh
   npm start
   ```

## Usage

### Fetch Financial Data

Send a POST request to `/api/financials` with the following JSON payload:
```json
{
  "ticker": "AAPL"
}
```

### Answer Financial Queries

Send a POST request to `/api/answer` with the following JSON payload:
```json
{
  "question": "What is the revenue for the last year?",
  "ticker": "AAPL"
}
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

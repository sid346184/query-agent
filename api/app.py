from flask import Flask, request, jsonify
import requests
import yfinance as yf
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

# Allow CORS from your React app's origin (adjust as needed)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS from React on localhost:3000

# Your Groq API key and endpoint
GROQ_API_KEY = "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"
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Function to fetch financial data
def get_financial_data(ticker):
    try:
        company = yf.Ticker(ticker)

        # Fetch the financials, income statement, and cash flow
        balance_sheet = company.balance_sheet
        income_statement = company.financials
        cash_flow = company.cashflow

        # Function to convert Timestamp to string
        def convert_timestamp_keys(data):
            if isinstance(data, pd.DataFrame):
                data = data.to_dict()
            new_data = {}
            for key, value in data.items():
                # If the key is a Timestamp, convert it to string
                if isinstance(key, pd.Timestamp):
                    new_key = key.strftime('%Y-%m-%d')  # Convert to string format
                    new_data[new_key] = value
                else:
                    new_data[key] = value
            return new_data

        # Convert all Timestamps in the data to strings
        return {
            "balance_sheet": convert_timestamp_keys(balance_sheet),
            "income_statement": convert_timestamp_keys(income_statement),
            "cash_flow": convert_timestamp_keys(cash_flow),
            "summary": company.info.get("longBusinessSummary", "No summary available.")
        }
    except Exception as e:
        return {"error": f"Error fetching data: {str(e)}"}

# Function to extract relevant revenue data from the financial data
def get_revenue_data(financial_data):
    income_statement = financial_data.get('income_statement', {})
    revenue_data = {}
    
    # Assuming 'Total Revenue' is a key in the income statement
    for year, data in income_statement.items():
        revenue_data[year] = data.get('Total Revenue', 'N/A')
    
    return revenue_data

@app.route("/api/financials", methods=["POST"])
def fetch_financials():
    data = request.json
    ticker = data.get("ticker")
    
    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400
    
    financial_data = get_financial_data(ticker)
    if "error" in financial_data:
        return jsonify({"error": financial_data["error"]}), 500

    return jsonify(financial_data)

@app.route("/api/answer", methods=["POST"])
def answer_query():
    data = request.json
    question = data.get("question")
    ticker = data.get("ticker")
    
    if not question or not ticker:
        return jsonify({"error": "Question and ticker are required"}), 400

    try:
        # Fetch financial data for the company
        financial_data = get_financial_data(ticker)

        # Only pass relevant financial data to Groq API (e.g., revenue)
        revenue_data = get_revenue_data(financial_data)

        # Prepare headers for the Groq API request
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GROQ_API_KEY}",
        }

        # Construct payload for the request with trimmed financial data
        payload = {
            "model": "llama3-8b-8192",
            "messages": [
                {
                    "role": "user",
                    "content": f"Question: {question}. Here is the relevant financial data: {revenue_data}. Please answer the question."
                }
            ]
        }

        # Send POST request to Groq API
        response = requests.post(GROQ_API_URL, json=payload, headers=headers)

        if response.status_code == 200:
            # Assuming Groq API returns the answer in the "choices" field
            answer = response.json().get("choices")[0].get("message").get("content")
            return jsonify({"answer": answer})
        else:
            return jsonify({"error": f"Error from Groq API: {response.text}"}), response.status_code

    except Exception as e:
        return jsonify({"error": f"Error processing question: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
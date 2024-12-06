import yfinance as yf

ticker = "AAPL"
company = yf.Ticker(ticker)
financials = company.financials
earnings = company.earnings

print("Financials:")
print(financials)
print("\nEarnings:")
print(earnings)

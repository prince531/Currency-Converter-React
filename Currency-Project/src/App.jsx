
import React from "react"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import "./App.css"

const Currency = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convert, setConvert] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try{
          const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
          setRates(response.data.rates)
      }catch(error){
        console.error('Error',error)
      }
    }
    fetchData();
  },[fromCurrency])

  const handelAmount = (e) => {
    setAmount(e.target.value);
  }
  
  const handelFrom = (e) => {
    setFromCurrency(e.target.value);
  }

  const handelTo = (e) => {
    setToCurrency(e.target.value);
  }
  
  const handelConvert  = () => {
    const result = (amount*rates[toCurrency]).toFixed(2);
    setConvert(result);
  }
  return(
    <>
    <div className="header">
      <h2>Currency Converter</h2>
    </div>
    <div className="CurrencyConverter">
      <h2> Currency Converter</h2>
      <div>
        <label>Amount
          <input type="number" placeholder ="0" value={amount} onChange={handelAmount}></input>
        </label>
      </div>
      <div>
        <label>From Currency
          <select onChange={handelFrom} value={fromCurrency}>
            {Object.keys(rates).map(currency =>(
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>To Currency
        <select onChange={handelTo} value={toCurrency}>
            {Object.keys(rates).map(currency =>(
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handelConvert}>Convert</button>
      <div>
        {convert !==0 && (
          <p>{amount} {fromCurrency} equals {convert} {toCurrency}</p>
        )}
        
      </div>
    </div>
    <div className="footer"><p>Developed by <a href="https://github.com/prince531" target="_blank">Prince Kumar</a></p></div>
    </>
  )
}
export default Currency;
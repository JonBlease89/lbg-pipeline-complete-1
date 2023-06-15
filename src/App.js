import { useState } from 'react';
import './App.css';
import DisplayBlock from './DisplayBlock';
import PriceEntryField from './PriceEntryField';
import VatRateField from './VatRateField';

function calculateDiscount(price) {
  return price * 0.1;
}

function App() {
  const [netPrice, setNetPrice] = useState(0.0);
  const [grossPrice, setGrossPrice] = useState(0.0);
  const [vatToPay, setVatToPay] = useState(0.0);
  const [vatRate, setVatRate] = useState(20.0);
  const [applyDiscount, setApplyDiscount] = useState(false);

  const handleNetPriceChange = (price) => {
    const gross_price = price * ((vatRate / 100) + 1);
    setNetPrice(price);
    setGrossPrice(gross_price);
    setVatToPay(gross_price - price);
  };

  const handleGrossPriceChange = (price) => {
    const net_price = price / ((vatRate / 100) + 1);
    setNetPrice(net_price);
    setGrossPrice(price);
    setVatToPay(price - net_price);
  };

  const handleVatRateChanged = (rate) => {
    setVatRate(rate);
    updatePrices();
  };

  const toggleDiscount = () => {
    setApplyDiscount(!applyDiscount);
  };

  const updatePrices = () => {
    if (applyDiscount) {
      const discountedPrice = calculateDiscount(netPrice);
      handleNetPriceChange(netPrice - discountedPrice);
    } else {
      handleNetPriceChange(netPrice);
    }
  };

  return (
    <div className='header field'>
      VAT CALCULATOR
      <div className='colour-border'>
        <VatRateField customstyle="field" vatRateChanged={handleVatRateChanged} value={vatRate} updatePrices={updatePrices} />
        <PriceEntryField customstyle="field" label="Price excl VAT: " priceChanged={handleNetPriceChange} price={netPrice === 0.0 ? "" : netPrice} />
        <DisplayBlock customstyle="field" label="VAT to pay: " value={vatToPay} />
        <PriceEntryField customstyle="field" label="Price incl VAT: " priceChanged={handleGrossPriceChange} price={grossPrice === 0.0 ? "" : grossPrice} />
        <button onClick={toggleDiscount}>{applyDiscount ? 'Remove Discount' : 'Apply Discount'}</button>
      </div>
    </div>
  );
}

export default App;

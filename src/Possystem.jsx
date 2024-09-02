import React, { useState ,useRef} from 'react';
import './App.css';
import { ShoppingCart, Minus, Plus, Trash2, Printer, CreditCard } from 'lucide-react';
import chickenMomosImage from './img/Chicken Momos.jpg';
import Puffs from './img/puffs.jpg';
import Dahipoori from './img/dahi poori.jpg';
import Rolls from './img/rolls.jpg';
import Samosa from './img/SAMOSA.jpg';
import Pavbajji from './img/pavbaji.jpg';
import baji from './img/bajji.jpg';
import Maggi from './img/maggi.jpg'
import Sandwich from './img/sand.jpg';

const products = [
  { id: 1, name: "Chicken Momos", price: 50.00, image: chickenMomosImage, color: "bg-red-100" },
  { id: 2, name: "Spicy Paneer Puffs", price: 25.00, image: Puffs, color: "bg-blue-100" },
  { id: 3, name: "DahiPoori", price: 60.00, image: Dahipoori, color: "bg-green-100" },
  { id: 4, name: "Chicken Kathi Roll", price: 90.00, image: Rolls, color: "bg-yellow-100" },
  { id: 5, name: "Samosas", price: 20.00, image: Samosa, color: "bg-purple-100" },
  { id: 6, name: "Pav Buji", price: 80.00, image: Pavbajji, color: "bg-pink-100" },
  { id: 7, name: "Maggi", price: 45.00, image: Maggi, color: "bg-indigo-100" },
  { id: 8, name: "Chessy SandWich", price: 35.00, image: Sandwich, color: "bg-teal-100" },
  { id: 9, name: "Baji", price: 65.00, image: baji, color: "bg-orange-100" },
];
const ImprovedPOSUI = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
const [customerPhone, setCustomerPhone] = useState('');
const customerNameRef = useRef();
const customerPhoneRef = useRef();
const paymentAmountRef=useRef();
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setTotal(total + product.price);
  };

  const removeFromCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
    setTotal(total - product.price);
  };

  const deleteFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
    setTotal(total - (product.price * product.quantity));
  };

  const handlePayment = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Please enter customer details");
      return;
    }
    const paid = parseFloat(paymentAmount);
    if (isNaN(paid) || paid < total) {
      alert("Please enter a valid payment amount");
      return;
    }
    const change = paid - total;
    alert(`Payment successful! Change: ₹${change.toFixed(2)}`);
    setCart([]);
    setTotal(0);
    setCustomerName(''); // Clear customer name after payment
    setCustomerPhone(''); // Clear customer phone after payment
    setShowPayment(false);
    setPaymentAmount('');
  };
  const printReceipt = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const receiptContent = document.getElementById('printable-receipt').innerHTML;
    printWindow.document.write('<html><head><title>Receipt</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(receiptContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const ProductCard = ({ product }) => (
    <div style={{
      backgroundColor: product.color,
      borderRadius: '8px',
      border: '1px solid #ddd',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      overflow: 'hidden',
      width: '100%', // Ensures the card takes up full width of its container
      boxSizing: 'border-box', // Ensures padding is included in width calculation
    }}>
      <img src={product.image} alt={product.name} style={{
        width: '100%',
        height: '210px', // Fixed height for consistent image size
        borderRadius: '8px',
        marginBottom: '8px',
        objectFit: 'cover'
      }} />
      <h3 style={{ margin: '8px 0', fontSize: '16px' }}>{product.name}</h3>
      <p style={{ fontWeight: 'bold', fontSize: '14px' }}>₹{product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background-color 0.3s'
        }}
        
      >
        Add to Order
      </button>
    </div>
  );
  

  const Receipt = () => (
    <div id="printable-receipt" style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      maxWidth: '400px',
      margin: '0 auto',
      overflow: 'hidden'
    }}>
      <h2 style={{ marginBottom: '16px' }}>Receipt</h2>
      <div style={{ marginBottom: '16px' }}>
        <p>StreetFood Wala</p>
        <p>589/ King Road, TamilNadu,India</p>
        <p>+91 7904787110</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <p><strong>Customer Name:</strong> {customerName}</p>
        <p><strong>Customer Phone:</strong> {customerPhone}</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span>{item.name} x{item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #ddd', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <p>Thank you for your business!</p>
        <p>Software by order.com/c/Possytem</p>
      </div>
    </div>
  );

  const PaymentScreen = () => (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      maxWidth: '400px',
      margin: '0 auto',
      overflow: 'hidden'
    }}>
      <h2 style={{ marginBottom: '16px' }}>
        <CreditCard style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Payment
      </h2>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Customer Name</label>

        <input
  type="text"
  ref={customerNameRef}
  defaultValue={customerName}
  onBlur={() => setCustomerName(customerNameRef.current.value)}
          style={{
            width: '90%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '16px',
            marginBottom: '16px',
            overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
          }}
          placeholder="Enter customer name"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Customer Phone</label>
        <input
          type="text"
          ref={customerPhoneRef}
          defaultValue={customerPhone} // Initial value if needed
          onBlur={() => setCustomerPhone(customerPhoneRef.current.value)}
          style={{
            width: '90%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '16px',
            marginBottom: '16px',
            
          }}
          placeholder="Enter customer phone number"
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Total Amount</label>
        <input
          type="text"
          value={`₹${total.toFixed(2)}`}
          style={{
            width: '90%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '16px',
            marginBottom: '16px',
            backgroundColor: '#f5f5f5'
          }}
          disabled
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>Enter Payment Amount</label>
        <input
          type="text"
          ref={paymentAmountRef}
          defaultValue={paymentAmount} // Initial value if needed
          onBlur={() => setPaymentAmount(paymentAmountRef.current.value)}
          style={{
            width: '90%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '16px',
            marginBottom: '16px'
          }}
          placeholder="Enter payment amount"
        />
      </div>
      <button onClick={handlePayment} style={{
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        width: '100%',
        marginBottom: '8px'
      }}>
        Process Payment
      </button>
      <button onClick={() => setShowPayment(false)} style={{
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        width: '100%'
      }}>
        Back to Order
      </button>
    </div>
  );
  if (showPayment) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <PaymentScreen />
        </div>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Receipt />
          <button
            onClick={printReceipt}
            style={{
              width: '100%',
              marginTop: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s'
            }}
          >
            <Printer style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Print Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ flex: 0.65, padding: '20px', overflowY: 'auto' }}>
        <div style={{
          borderRadius: '8px',
          border: '1px solid #ddd',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h1 style={{ marginBottom: '16px' }}>Menu Items</h1>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))',
            gap: '16px',
            overflowY: 'auto'
          }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 0.35, padding: '20px', overflowY: 'auto' }}>
        <div style={{
          borderRadius: '8px',
          border: '1px solid #ddd',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{ marginBottom: '16px' }}>
            <ShoppingCart style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Your Order
          </h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div style={{ marginBottom: '16px', overflowY: 'auto' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #ddd'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px' }}>{item.name}</h3>
                      <p style={{ margin: '0' }}>Quantity: {item.quantity}</p>
                      <p style={{ margin: '0' }}>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => removeFromCart(item)} style={{
                        backgroundColor: '#ffc107',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}>
                        <Minus />
                      </button>
                      <button onClick={() => addToCart(item)} style={{
                        backgroundColor: '#28a745',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}>
                        <Plus />
                      </button>
                      <button onClick={() => deleteFromCart(item)} style={{
                        backgroundColor: '#dc3545',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}>
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #ddd', paddingTop: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Total: ₹{total.toFixed(2)}</span>
              </div>
              <button onClick={() => setShowPayment(true)} style={{
                width: '100%',
                marginTop: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s'
              }}>
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImprovedPOSUI;

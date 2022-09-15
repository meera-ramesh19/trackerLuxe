import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './NewTransaction.css';
import Swal from 'sweetalert2';

const API = process.env.REACT_APP_API_URL;

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

const NewTransaction = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  var toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => { 
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const sourcesData = [
    {
      stype: 'income',
      categories: [
        'Business',
        'Investments',
        'Extra income',
        'Deposits',
        'Lottery',
        'Gifts',
        'Salary',
        'Savings',
        'Rental income',
      ],
    },
    {
      stype: 'expense',
      categories: [
        'Bills',
        'Car',
        'Clothes',
        'Travel',
        'Food',
        'Shopping',
        'House',
        'Entertainment',
        'Phone',
        'Pets',
        'Other',
      ],
    },
  ];

  const [{ types, cat }, setData] = useState({
    types: 'income',
    cat: '',
  });

  const finances = sourcesData.map((source) => (
    <option key={source.stype} value={source.stype}>
      {source.stype}
    </option>
  ));

  const categories = sourcesData
    .find((item) => item.stype === types)
    ?.categories.map((cats) => (
      <option key={cats} value={cats}>
        {cats}
      </option>
    ));
  //declare states
  const [transaction, setTransaction] = useState({
    itemName: '',
    amount: '',
    userDate: '',
    from: '',
    category: '',
    sourceType: '',
  });
  // handle change event of the country dropdown
  const handlefinanceChange = (event) => {
    console.log('types', event.target.value);
    setData((data) => ({ cat: '', types: event.target.value }));
  };

  // handle change event of the language dropdown
  const handleCatChange = (event) => {
    console.log('cat', event.target.value);
    setData((data) => ({ ...data, cat: event.target.value }));
  };

  const handleTextChange = (event) => {
    console.log(event.target.value);

    setTransaction({
      ...transaction,
      [event.target.id]: event.target.value,
    });
    console.log('in text change',transaction)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   console.log('inhandlesumbit',transaction)
    axios
      .post(`${API}/api/transactions`, transaction)
      .then(() => {
        console.log('added')
        // document
        //   .querySelector('.second')
        //   .addEventListener('click', function () {
        //     toastMixin.fire({
        //       animation: true,
        //       title: 'Added a transaction',
        //     });
        //   });
        // navigate(`/transactions`);
      })
      .catch((c) => console.error('catch', c));
  };

  return (
    <div className='add-trans'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='itemName'>Item Name: </label>
          <input
            id='itemName'
            type='text'
            value={transaction.itemName}
            onChange={handleTextChange}
            required
            placeholder='paycheck.'
          />
        </div>
        <div>
          <label htmlFor='amount'>Amount: </label>
          <input
            id='amount'
            type='number'
            required
            value={transaction.amount}
            onChange={handleTextChange}
            placeholder='Dollar Amount'
          />
        </div>
        <div>
          <label htmlFor='userDate'>Date: </label>
          <input
            id='userDate'
            type='date'
            name='userDate'
            value={transaction.userDate}
            onChange={handleTextChange}
            required
            placeholder='date'
          />
        </div>
        <div>
          <label htmlFor='from'>From: </label>
          <input
            id='from'
            type='text'
            name='from'
            onChange={handleTextChange}
            value={transaction.from}
            required
            placeholder='work....'
          />
        </div>
        <div>
          <label htmlFor='sourceType'>SourceType: </label>
          {/* <select
           id='sourceType' 
           name='sourceType'
           value={transaction.sourceType}
           onChange={handleTextChange}>
             {/* <option>Choose...</option>
            <option>Income</option>
            <option>Expense</option> 
          </select> */}
          {/* onChange={e => { functionOne(e); functionTwo() }} 
             or call like this
             onChange={this.twoCalls}
             in twocalls
             twoCalls = e => {
              this.functionOne(e)
              this.functionTwo()
            }*/}

          <select
            id='sourceType'
            type='text'
            value={transaction.sourceType}
            onChange={(e) => {
              handlefinanceChange(e);
              handleTextChange(e);
            }}
          >
            {finances}
          </select>
        </div>
        <div>
          <label htmlFor='category'>Category: </label>

          {/* <select
            className='text'
            onChange={handleTextChange}
            id='category'
            name='category'
            value={transaction.categ}
           >
           <option className='text' value='⬇️ Select an option ⬇️'>
              {' '}
             -- Select an option --{' '}
             </option> 
             {console.log(choices)}
            //  {choices} 
           
          </select> */}
          <select
            id='category'
            type='text'
            value={cat}
            onChange={(e) => {
              handleTextChange(e);
              handleCatChange(e);
            }}
          >
            {categories}
          </select>
        </div>

        <br />
        <div className='add-btn'>
          <input className='new-btns' type='submit' onClick={fire} />
          <button style={{ border: 'none' }} className='second'></button>
          <Link
            style={{ margin: '0 auto', textAlign: 'center' }}
            to={`/transactions`}
          >
            <button className='new-btns'>Cancel </button>
          </Link>
        </div>
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      </form>
    </div>
  );
};

export default NewTransaction;

// https://stackoverflow.com/questions/64495308/cascade-dropdown-using-react-hooks
// https://codesandbox.io/s/react-cascading-select-c3hji
// https://www.cluemediator.com/cascading-dropdown-in-react
// https://stackoverflow.com/questions/54032379/call-two-functions-within-onchange-event-in-react

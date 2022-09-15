import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
const API = process.env.REACT_APP_API_URL;

const UpdateTransaction = () => {
  let { id } = useParams();

  const navigate = useNavigate();

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
  const [transaction, setTransaction] = useState({
    // transId: '',
    itemName: '',
    amount: 0,
    userDate: '',
    from: '',
    category: '',
    sourcetype: '',
  });

  const toastMixin = Swal.mixin({
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

  useEffect(() => {
    axios
      .get(`${API}/api/transactions/${id}`)
      .then((res) => {
        // console.log(res.data);
        setTransaction({
          itemName: res.data.itemName,
          amount: res.data.amount,
          userDate: res.data.userDate.split('T')[0],
          from: res.data.from,
          category: res.data.category,
          sourcetype: res.data.sourcetype,
        });
      })
      .catch((e) => console.error(e));
  }, [id]);

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

  const onInputChange = (event) => {
    console.log(event.target.value);
    setTransaction({
      ...transaction,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${API}/api/transactions/${id}`, transaction)
      .then((res) => {
        document
          .querySelector('.second')
          .addEventListener('click', function () {
            toastMixin.fire({
              animation: true,
              title: 'Updated Successfully',
            });
          });
        navigate(`/transactions`);
      })
      .catch((c) => console.warn('catch', c));
  };

  return (
    <div className='edit-trans'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='itemName'>itemName:</label>
          <input
            id='itemName'
            name='itemName'
            value={transaction.itemName}
            type='text'
            onChange={onInputChange}
            placeholder='Item Name'
            required
          />
        </div>
        <div>
          <label htmlFor='amount'>Amount:</label>
          <input
            id='amount'
            type='number'
            name='amount'
            value={transaction.amount}
            placeholder='amount'
            onChange={onInputChange}
          />
        </div>
        <div>
          <label htmlFor='userDate'>Date:</label>
          <input
            id='userDate'
            type='date'
            name='userDate'
            value={transaction.userDate}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label htmlFor='from'>From:</label>
          <input
            id='from'
            name='from'
            type='text'
            required
            value={transaction.from}
            placeholder='from'
            onChange={onInputChange}
          />
        </div>

        <div>
          <label htmlFor='sourcetype'>Type: </label>
          {/* <input
            id='sourcetype'
            type='text'
            name='sourcetype'
            value={transaction.sourcetype}
            placeholder='Enter Income or Expense'
            onChange={onInputChange}
            required
          /> */}
          <select
            id='sourceType'
            type='text'
            value={transaction.sourceType}
            onChange={(e) => {
              handlefinanceChange(e);
              onInputChange(e);
            }}
          >
            {finances}
          </select>
        </div>
        <div>
          <label htmlFor='category'>Category:</label>
          {/* <input
            id='category'
            type='category'
            name='category'
            value={transaction.category}
            onChange={onInputChange}
          /> */}
          <select
            id='category'
            type='text'
            value={cat}
            onChange={(e) => {
              onInputChange(e);
              handleCatChange(e);
            }}
          >
            {categories}
          </select>
        </div>

        <div
          className='edit-btn'
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            padding: '2rem 30rem',
          }}
        >
          {/* <div> */}
          <input
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '1rem',
              background: 'transparent',
            }}
            className='update-btns second'
            type='submit'
          />
          {/* </div>
          <div> */}
          <Link to={`/transactions/${id}`}>
            <button
              style={{
                padding: '1rem 1.5rem',
                borderRadius: '1rem',
                background: 'transparent',
              }}
              className='update-btns'
            >
              Back
            </button>
          </Link>
          {/* </div> */}
        </div>
      </form>
    </div>
  );
};

export default UpdateTransaction;

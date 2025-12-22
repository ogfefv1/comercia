import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../features/layout/Layout';
import Home from '../../pages/home/Home';
import Privacy from '../../pages/privacy/Privacy';
import Section from '../../pages/section/Section';
import Product from '../../pages/product/Product';
import Auth from '../../pages/auth/Auth';
import { AppContext } from '../../features/app_context/AppContext';
import type { UserType } from '../../entities/user/model/UserType';
import type ToastData from '../../features/app_context/ToastData';
import type CartType from '../../entities/ cart/model/CartType';
import Cart from '../../pages/cart/Cart';
import CartDao from '../../entities/ cart/api/CartDao';
import './App.css';
import type ModalData from '../../features/modal/ModalData';
import Modal from './Modal/Modal';

declare global {
  interface Number {
        toMoney: () => string;
  }
}

Number.prototype.toMoney = function() : string {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function App() {
  const [user, setUser] = useState<UserType|null>(null);

  const [cart, setCart] = useState<CartType>(CartDao.restoreSaved());
  useEffect(() => {
    CartDao.save(cart);
  }, [cart]);
  
  const [toastData, setToastData] = useState<ToastData|null>(null);
  const [toastQueue, setToastQueue] = useState<Array<ToastData>>([]);

  const dequeueToast = () => {
      setToastQueue(q => q.slice(0, q.length - 1));
  };

  const showToast = (data: ToastData) => {
      setToastQueue([data, ...toastQueue]);
  };

  useEffect(() => {
      // console.log(toastQueue);
      if(toastQueue.length == 0) {
          setToastData(null);
      }
      else {
          // если последнее сообщение не показывается, то переключаем на него
          let lastToastData = toastQueue[toastQueue.length - 1];
          if(toastData != lastToastData) {
              setToastData(lastToastData);
              setTimeout(dequeueToast, lastToastData.timeout ?? 2000);
          }
      }
  }, [toastQueue]);

  useEffect(() => {  // useEffect с пустым массивом "наблюдения"
    // выполняется однократно, когда элемент встраивается в DOM
    console.log("App started");
    // на старте проверяем наличие в постоянном хранилище хранимых данных
    const savedUser = window.localStorage.getItem("user-231");
    if(savedUser) {
      // восстанавливаем авторизацию
      try {
        setUser( JSON.parse(savedUser) );
      }
      catch(err) {
        console.error("User restore error: ", err);
      }
      
    }

    // возвращенное действие будет выполнено при разрушении элемента (извлечение из DOM)
    return () => {
      console.log("App finished");
    };
  }, []);



  
  const [modalData, setModalData] = useState<ModalData|null>(null);
  const showModal = (data:ModalData) => {
    setModalData(data);
  }

  return <AppContext.Provider value={{showModal, user, setUser, showToast, cart, setCart}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='auth' element={<Auth />} />
          <Route path='cart' element={<Cart />} />
          <Route path='privacy' element={<Privacy />} />
          <Route path='product/:slug' element={<Product />} />
          <Route path='section/:slug' element={<Section />} />
        </Route>
      </Routes>
    </BrowserRouter>

    <div className="toaster">
        {/* <div className="toast-text" style={{display: toastData ? "block" : "none"}}>
            {toastData?.message}
        </div> */}
            {toastQueue.map((td, i) => <div key={i + td.message} className="toast-text">
                {td.message}
            </div>)}
    </div>

    <Modal modalData={modalData} setModalData={setModalData} />

  </AppContext.Provider>;
}
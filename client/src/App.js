
import  AppRouter  from "./component/AppRouter";
import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from "./routes/Footer";


function App() {
  

  return (
    <div>
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;

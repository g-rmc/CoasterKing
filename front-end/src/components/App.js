import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyle, ThemeStyle } from '../styles';
import { UserContextProvider, ThemeContextProvider, QueryContextProvider, CoastersContextProvider } from '../contexts';
import { PrivateRoutes } from './routes';
import { Login, Main, Coasters, Mylist } from './screens';
import { SwitchColorModeButton, Loading } from './utils';


export default function App() {
  useEffect(() => {
    alert(
      `Olá, bem vinde ao Coaster KING
      Esta aplicação ainda está em fase de desenvolvimento
      Mas divirta-se explorando o app :D
      
      @g_rmc
      `);
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeStyle />

      <ThemeContextProvider>
        <UserContextProvider>
          <QueryContextProvider>
            <CoastersContextProvider>
            
              <Container>
                <SwitchColorModeButton />
                <Loading />
                <BrowserRouter>
                  <Routes>

                    <Route path='/' element={<Login />}/>
                    <Route path='/main' element={<PrivateRoutes><Main /></PrivateRoutes>}/>
                    <Route path='/coasters' element={<PrivateRoutes><Coasters /></PrivateRoutes>}/>
                    <Route path='/mylist' element={<PrivateRoutes><Mylist /></PrivateRoutes>}/>
                    <Route path="*" element={<Navigate to="/" />} />

                  </Routes>
                </BrowserRouter>
              </Container>
              
            </CoastersContextProvider>
          </QueryContextProvider>
        </UserContextProvider>  
      </ThemeContextProvider>
    </>
  );
}

//Styled for mimic app screen into PC
const Container = styled.div` 
  width: 100%;
  min-width: 350px;
  max-width: 600px;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

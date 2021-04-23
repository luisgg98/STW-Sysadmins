import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

// https://www.robinwieruch.de/react-testing-library

describe('Testing main application', () => {
    test('It should renders App component', async() => {
        render(<App />);
        expect(screen.getByText('Zitation Search')).toBeInTheDocument();
        expect(screen.getByRole('button',{name:'Iniciar sesión'})).toBeInTheDocument();
        expect(screen.getByRole('button',{name:'Registrar Negocio'})).toBeInTheDocument();
        expect(screen.getByRole('button',{name:'Mapa incidencia Covid-19 en Zaragoza'})).toBeInTheDocument();

    });
});

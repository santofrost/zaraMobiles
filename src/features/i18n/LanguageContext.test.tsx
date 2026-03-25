import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

const TestComponent = () => {
    const { language, setLanguage, t } = useLanguage();
    return (
        <div>
            <span data-testid="lang">{language}</span>
            <span data-testid="translation">{t('cart.empty' as any)}</span>
            <button onClick={() => setLanguage('en')}>Set EN</button>
        </div>
    );
};

describe('LanguageContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('provides default spanish translation', () => {
        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );
        expect(screen.getByTestId('lang')).toHaveTextContent('es');
        expect(screen.getByTestId('translation')).toHaveTextContent('Tu carrito está vacío');
    });

    it('allows language change to english', () => {
        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );
        act(() => {
            screen.getByText('Set EN').click();
        });

        expect(screen.getByTestId('lang')).toHaveTextContent('en');
        // El translation debería actualizarse
        expect(screen.getByTestId('translation')).toHaveTextContent('Your cart is empty');
        // Debe persistir en localStorage
        expect(localStorage.getItem('language')).toBe('en');
    });

    it('loads language from localStorage on mount', () => {
        localStorage.setItem('language', 'en');
        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );
        expect(screen.getByTestId('lang')).toHaveTextContent('en');
    });

    it('throws error if useLanguage is used outside LanguageProvider', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        expect(() => render(<TestComponent />)).toThrow('useLanguage must be used within a LanguageProvider');
        consoleError.mockRestore();
    });
});

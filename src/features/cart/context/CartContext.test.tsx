import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const TestComponent = () => {
    const { items, itemCount, addItem, removeItem, updateQuantity } = useCart();
    return (
        <div>
            <span data-testid="count">{itemCount}</span>
            <button onClick={() => addItem({ productId: '1', brand: 'Brand', name: 'Name', price: 100, imageUrl: '', storage: '128GB', color: 'Black' })}>Add</button>
            <button onClick={() => updateQuantity('1-128GB-Black', 2)}>Update</button>
            <button onClick={() => removeItem('1-128GB-Black')}>Remove</button>
        </div>
    );
};

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('adds an item to visually empty cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        expect(screen.getByTestId('count')).toHaveTextContent('0');
        act(() => {
            screen.getByText('Add').click();
        });
        expect(screen.getByTestId('count')).toHaveTextContent('1');
    });

    it('updates item quantity', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        act(() => {
            screen.getByText('Add').click();
        });
        act(() => {
            screen.getByText('Update').click();
        });
        expect(screen.getByTestId('count')).toHaveTextContent('2'); // Items x Quantity
    });

    it('removes item from cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        act(() => {
            screen.getByText('Add').click();
        });
        act(() => {
            screen.getByText('Remove').click();
        });
        expect(screen.getByTestId('count')).toHaveTextContent('0');
    });
});

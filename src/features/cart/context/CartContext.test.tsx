import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const TestComponent = () => {
    const { itemCount, addItem, removeItem, updateQuantity } = useCart();
    return (
        <div>
            <span data-testid="count">{itemCount}</span>
            <button onClick={() => addItem({ productId: '1', brand: 'Brand', name: 'Name', price: 100, imageUrl: '', storage: '128GB', color: 'Black' })}>Add</button>
            <button onClick={() => updateQuantity('1-128GB-Black', 2)}>Update</button>
            <button onClick={() => updateQuantity('1-128GB-Black', 0)}>Update To 0</button>
            <button onClick={() => removeItem('1-128GB-Black')}>Remove</button>
        </div>
    );
};

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
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

    it('adds the same item twice to increase quantity', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        act(() => {
            screen.getByText('Add').click();
        });
        act(() => {
            screen.getByText('Add').click();
        });
        expect(screen.getByTestId('count')).toHaveTextContent('2');
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

    it('updates item quantity to 0 removes the item', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        act(() => {
            screen.getByText('Add').click();
        });
        act(() => {
            screen.getByText('Update To 0').click();
        });
        expect(screen.getByTestId('count')).toHaveTextContent('0');
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

    it('initializes with data from localStorage', () => {
        const mockCart = [{
            cartId: '1-128GB-Black',
            productId: '1',
            brand: 'Brand',
            name: 'Name',
            price: 100,
            imageUrl: '',
            storage: '128GB',
            color: 'Black',
            quantity: 5
        }];
        localStorage.setItem("mobileStore_cart", JSON.stringify(mockCart));

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        expect(screen.getByTestId('count')).toHaveTextContent('5');
    });

    it('handles localStorage JSON parse errors gracefully', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        localStorage.setItem("mobileStore_cart", "invalid-json");

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        expect(screen.getByTestId('count')).toHaveTextContent('0');
        expect(consoleError).toHaveBeenCalledWith("Failed to load cart from local storage", expect.any(Error));
        consoleError.mockRestore();
    });

    it('throws error if useCart is used outside CartProvider', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
        expect(() => render(<TestComponent />)).toThrow('useCart must be used within a CartProvider');
        consoleError.mockRestore();
    });

    it('leaves other items untouched when adding existing item', () => {
        // Setup initial cart with two different items
        const mockCart = [
            { cartId: '1-128GB-Black', productId: '1', brand: 'Brand', name: 'Name', price: 100, imageUrl: '', storage: '128GB', color: 'Black', quantity: 1 },
            { cartId: '2-256GB-White', productId: '2', brand: 'Brand', name: 'Name', price: 200, imageUrl: '', storage: '256GB', color: 'White', quantity: 1 }
        ];
        localStorage.setItem("mobileStore_cart", JSON.stringify(mockCart));

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        // Add the primary item again
        act(() => {
            screen.getByText('Add').click();
        });

        // Count should be (1+1) + 1 = 3
        expect(screen.getByTestId('count')).toHaveTextContent('3');
    });

    it('leaves other items untouched when updating quantity of a specific item', () => {
        // Setup initial cart with two different items
        const mockCart = [
            { cartId: '1-128GB-Black', productId: '1', brand: 'Brand', name: 'Name', price: 100, imageUrl: '', storage: '128GB', color: 'Black', quantity: 1 },
            { cartId: '2-256GB-White', productId: '2', brand: 'Brand', name: 'Name', price: 200, imageUrl: '', storage: '256GB', color: 'White', quantity: 1 }
        ];
        localStorage.setItem("mobileStore_cart", JSON.stringify(mockCart));

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        act(() => {
            // Update updates '1-128GB-Black' to 2.
            screen.getByText('Update').click();
        });

        // The second item should remain intact inside prev.map, thus entering the `false` boundary of the ternary.
        // Final count: 2 (from first item) + 1 (from second item) = 3
        expect(screen.getByTestId('count')).toHaveTextContent('3');
    });
});

import { render, screen, act } from '@testing-library/react';
import ColorSelector from './ColorSelector';

jest.mock('@/features/i18n/LanguageContext', () => ({
    useLanguage: () => ({ t: (key: string) => key }),
}));

describe('ColorSelector Component', () => {
    const mockOptions = [
        { name: 'Red', hexCode: '#FF0000', imageUrl: '' },
        { name: 'Blue', hexCode: '#0000FF', imageUrl: '' }
    ];

    it('renders translation key correctly', () => {
        render(<ColorSelector options={mockOptions} selectedColor={null} onSelect={() => { }} />);
        expect(screen.getByText('detail.color')).toBeInTheDocument();
    });

    it('calls onSelect handler with correct index when a color is clicked', () => {
        const handleSelect = jest.fn();
        render(<ColorSelector options={mockOptions} selectedColor={null} onSelect={handleSelect} />);

        const buttons = screen.getAllByRole('button');
        act(() => {
            buttons[0].click();
        });
        expect(handleSelect).toHaveBeenCalledWith(0);
    });
});

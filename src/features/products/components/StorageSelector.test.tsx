import { render, screen, act } from '@testing-library/react';
import StorageSelector from './StorageSelector';

jest.mock('@/features/i18n/LanguageContext', () => ({
    useLanguage: () => ({ t: (key: string) => key }),
}));

describe('StorageSelector Component', () => {
    const mockOptions = [
        { capacity: '128 GB', price: 1000 },
        { capacity: '256 GB', price: 1100 }
    ];

    it('renders translation key and capacities correctly', () => {
        render(<StorageSelector options={mockOptions} selectedStorage={null} onSelect={() => { }} />);
        expect(screen.getByText('detail.storage')).toBeInTheDocument();
        expect(screen.getByText('128 GB')).toBeInTheDocument();
        expect(screen.getByText('256 GB')).toBeInTheDocument();
    });

    it('calls onSelect handler with correct index when storage is clicked', () => {
        const handleSelect = jest.fn();
        render(<StorageSelector options={mockOptions} selectedStorage={null} onSelect={handleSelect} />);

        act(() => {
            screen.getByText('128 GB').click();
        });
        expect(handleSelect).toHaveBeenCalledWith(0);
    });
});

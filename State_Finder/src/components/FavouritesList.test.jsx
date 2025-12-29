import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FavouritesList from './FavouritesList'

const mockFavourites = [
    {
        id: 'prop1',
        type: 'House',
        bedrooms: 3,
        price: 750000,
        location: 'Petts Wood Road',
        picture: '/images/prop1pic1small.jpg'
    },
    {
        id: 'prop2',
        type: 'Flat',
        bedrooms: 2,
        price: 400000,
        location: 'Crofton Road',
        picture: '/images/prop2pic1small.jpg'
    }
]

const renderWithProviders = (component) => {
    return render(
        <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
                {component}
            </DndProvider>
        </BrowserRouter>
    )
}

describe('FavouritesList', () => {
    it('renders favourites list with correct count', () => {
        const mockOnRemove = vi.fn()
        const mockOnClearAll = vi.fn()
        const mockOnAddToFavorites = vi.fn()

        renderWithProviders(
            <FavouritesList
                favorites={mockFavourites}
                onRemove={mockOnRemove}
                onClearAll={mockOnClearAll}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        // Check if heading contains "My Favorites" and the count (2)
        const heading = screen.getByRole('heading', { name: /My Favorites/i })
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent('2')
    })

    it('displays all favourite properties', () => {
        const mockOnRemove = vi.fn()
        const mockOnClearAll = vi.fn()
        const mockOnAddToFavorites = vi.fn()

        renderWithProviders(
            <FavouritesList
                favorites={mockFavourites}
                onRemove={mockOnRemove}
                onClearAll={mockOnClearAll}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        expect(screen.getByText(/750,000/i)).toBeInTheDocument()
        expect(screen.getByText(/400,000/i)).toBeInTheDocument()
    })

    it('shows empty message when no favourites', () => {
        const mockOnRemove = vi.fn()
        const mockOnClearAll = vi.fn()
        const mockOnAddToFavorites = vi.fn()

        renderWithProviders(
            <FavouritesList
                favorites={[]}
                onRemove={mockOnRemove}
                onClearAll={mockOnClearAll}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument()
    })

    it('calls onRemove when remove button is clicked', async () => {
        const mockOnRemove = vi.fn()
        const mockOnClearAll = vi.fn()
        const mockOnAddToFavorites = vi.fn()
        const user = userEvent.setup()

        renderWithProviders(
            <FavouritesList
                favorites={mockFavourites}
                onRemove={mockOnRemove}
                onClearAll={mockOnClearAll}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        const removeButtons = screen.getAllByTitle(/Remove from favorites/i)
        await user.click(removeButtons[0])

        expect(mockOnRemove).toHaveBeenCalledWith('prop1')
    })

    it('calls onClear when Clear All button is clicked', async () => {
        const mockOnRemove = vi.fn()
        const mockOnClearAll = vi.fn()
        const mockOnAddToFavorites = vi.fn()
        const user = userEvent.setup()

        renderWithProviders(
            <FavouritesList
                favorites={mockFavourites}
                onRemove={mockOnRemove}
                onClearAll={mockOnClearAll}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        const clearButton = screen.getByRole('button', { name: /Clear All Favorites/i })
        await user.click(clearButton)

        expect(mockOnClearAll).toHaveBeenCalled()
    })

    it('does not show Clear All button when favourites is empty', () => {
        const mockOnRemove = vi.fn()
        const mockOnClearAll = vi.fn()
        const mockOnAddToFavorites = vi.fn()

        renderWithProviders(
            <FavouritesList
                favorites={[]}
                onRemove={mockOnRemove}
                onClearAll={mockOnClearAll}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        const clearButton = screen.queryByRole('button', { name: /Clear All/i })
        expect(clearButton).not.toBeInTheDocument()
    })
})

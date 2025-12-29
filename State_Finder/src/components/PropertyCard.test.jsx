import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PropertyCard from './PropertyCard'

const mockProperty = {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 750000,
    description: 'Beautiful three bedroom house with garden and garage',
    location: 'Petts Wood Road, Petts Wood, Orpington BR5',
    picture: '/images/prop1pic1small.jpg'
}

const renderWithProviders = (component) => {
    return render(
        <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
                {component}
            </DndProvider>
        </BrowserRouter>
    )
}

describe('PropertyCard', () => {
    it('renders property information correctly', () => {
        const mockOnAddToFavorites = vi.fn()
        renderWithProviders(
            <PropertyCard
                property={mockProperty}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        expect(screen.getByText(/750,000/i)).toBeInTheDocument()
        expect(screen.getByText(/3 bedroom House/i)).toBeInTheDocument()
        expect(screen.getByText(/Beautiful three bedroom house/i)).toBeInTheDocument()
    })

    it('displays property image', () => {
        const mockOnAddToFavorites = vi.fn()
        renderWithProviders(
            <PropertyCard
                property={mockProperty}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        const image = screen.getByAltText(mockProperty.location)
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', mockProperty.picture)
    })

    it('calls onAddToFavourites when Favourite button is clicked', async () => {
        const mockOnAddToFavorites = vi.fn()
        const user = userEvent.setup()

        renderWithProviders(
            <PropertyCard
                property={mockProperty}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        const favouriteButton = screen.getByRole('button', { name: /Favorite/i })
        await user.click(favouriteButton)

        expect(mockOnAddToFavorites).toHaveBeenCalledWith(mockProperty)
    })

    it('has a link to property details page', () => {
        const mockOnAddToFavorites = vi.fn()
        renderWithProviders(
            <PropertyCard
                property={mockProperty}
                onAddToFavorites={mockOnAddToFavorites}
            />
        )

        const detailsLink = screen.getByRole('link', { name: /View Details/i })
        expect(detailsLink).toBeInTheDocument()
        expect(detailsLink).toHaveAttribute('href', `/property/${mockProperty.id}`)
    })
})

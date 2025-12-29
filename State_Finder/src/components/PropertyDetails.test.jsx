import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PropertyDetails from './PropertyDetails'

const mockProperties = [
    {
        id: 'prop1',
        type: 'House',
        bedrooms: 3,
        price: 750000,
        tenure: 'Freehold',
        description: 'Beautiful three bedroom house with garden',
        location: 'Petts Wood Road, Petts Wood, Orpington BR5',
        postcode: 'BR5',
        picture: '/images/prop1pic1small.jpg',
        images: [
            '/images/prop1pic1.jpg',
            '/images/prop1pic2.jpg',
            '/images/prop1pic3.jpg'
        ],
        floorPlan: '/images/prop1floor.jpg',
        added: {
            month: 'October',
            day: 12,
            year: 2022
        }
    }
]

const renderWithRouter = (propertyId = 'prop1') => {
    const mockOnAddToFavourites = vi.fn()
    const mockFavourites = []

    return render(
        <MemoryRouter initialEntries={[`/property/${propertyId}`]}>
            <Routes>
                <Route
                    path="/property/:id"
                    element={
                        <PropertyDetails
                            properties={mockProperties}
                            onAddToFavourites={mockOnAddToFavourites}
                            favourites={mockFavourites}
                        />
                    }
                />
            </Routes>
        </MemoryRouter>
    )
}

describe('PropertyDetails', () => {
    it('renders property details correctly', () => {
        renderWithRouter()

        expect(screen.getByText(/750,000/i)).toBeInTheDocument()
        expect(screen.getByText(/3 bedroom House/i)).toBeInTheDocument()
        // Use getAllByText for duplicate text
        const freeholdElements = screen.getAllByText(/Freehold/i)
        expect(freeholdElements.length).toBeGreaterThan(0)
    })

    it('displays property description', () => {
        renderWithRouter()

        expect(screen.getByText(/Beautiful three bedroom house/i)).toBeInTheDocument()
    })

    it('shows back to search link', () => {
        renderWithRouter()

        const backLink = screen.getByRole('link', { name: /Back to Search/i })
        expect(backLink).toBeInTheDocument()
        expect(backLink).toHaveAttribute('href', '/')
    })

    it('displays Add to Favourites button', () => {
        renderWithRouter()

        const favouriteButton = screen.getByRole('button', { name: /Add to Favorites/i })
        expect(favouriteButton).toBeInTheDocument()
    })

    it('shows property not found for invalid ID', () => {
        renderWithRouter('invalid-id')

        expect(screen.getByText(/Property not found/i)).toBeInTheDocument()
    })

    it('displays tabs for Description, Floor Plan, and Map', () => {
        renderWithRouter()

        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Floor Plan')).toBeInTheDocument()
        expect(screen.getByText('Map')).toBeInTheDocument()
    })
})

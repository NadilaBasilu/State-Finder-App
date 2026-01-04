import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
    it('renders the app header', () => {
        render(<App />)

        // Changed to match actual header text "EstateFinder"
        const headerElement = screen.getByRole('heading', { level: 1 })
        expect(headerElement).toBeInTheDocument()
        expect(headerElement.textContent).toMatch(/EstateFinder/i)
    })

    it('renders the search form', () => {
        render(<App />)

        expect(screen.getByRole('heading', { name: /Search Properties/i })).toBeInTheDocument()
    })

    it('renders the favourites section', () => {
        render(<App />)

        expect(screen.getByText(/My Favorites/i)).toBeInTheDocument()
    })

    it('displays property results', () => {
        render(<App />)

        expect(screen.getByText(/Properties Found/i)).toBeInTheDocument()
    })
})

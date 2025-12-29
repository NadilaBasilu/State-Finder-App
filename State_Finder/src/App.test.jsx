import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
    it('renders the app header', () => {
        render(<App />)

        // Use heading role to avoid duplicates
        const headerElement = screen.getByRole('heading', { name: /Property Search/i, level: 1 })
        expect(headerElement).toBeInTheDocument()
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

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from './SearchForm'

describe('SearchForm', () => {
    it('renders the search form with all fields', () => {
        const mockOnSearch = vi.fn()
        render(<SearchForm onSearch={mockOnSearch} />)

        // Use heading role instead of text
        expect(screen.getByRole('heading', { name: /Search Properties/i })).toBeInTheDocument()
        expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Min Bedrooms/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Max Bedrooms/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Postcode Area/i)).toBeInTheDocument()
    })

    it('allows user to input search criteria', async () => {
        const mockOnSearch = vi.fn()
        const user = userEvent.setup()
        render(<SearchForm onSearch={mockOnSearch} />)

        const postcodeInput = screen.getByLabelText(/Postcode Area/i)
        await user.type(postcodeInput, 'BR1')

        expect(postcodeInput.value).toBe('BR1')
    })

    it('calls onSearch when form is submitted', async () => {
        const mockOnSearch = vi.fn()
        const user = userEvent.setup()
        render(<SearchForm onSearch={mockOnSearch} />)

        const searchButton = screen.getByRole('button', { name: /Search Properties/i })
        await user.click(searchButton)

        expect(mockOnSearch).toHaveBeenCalled()
    })

    it('resets form when Reset button is clicked', async () => {
        const mockOnSearch = vi.fn()
        const user = userEvent.setup()
        render(<SearchForm onSearch={mockOnSearch} />)

        const postcodeInput = screen.getByLabelText(/Postcode Area/i)
        await user.type(postcodeInput, 'BR1')

        const resetButton = screen.getByRole('button', { name: /Reset/i })
        await user.click(resetButton)

        expect(postcodeInput.value).toBe('')
    })

    it('updates property type selection', async () => {
        const mockOnSearch = vi.fn()
        const user = userEvent.setup()
        render(<SearchForm onSearch={mockOnSearch} />)

        const typeSelect = screen.getByLabelText(/Property Type/i)
        await user.selectOptions(typeSelect, 'House')

        expect(typeSelect.value).toBe('House')
    })
})

import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './'

test('home page exists', () => {
    const { getByRole } = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
    expect(getByRole('home')).toBeInTheDocument()
})

test('home page contains a vertical carousel', () => {
    const { getByRole } = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
    expect(getByRole('verticalCarousel')).toBeInTheDocument()
})

test('home page contains a vertical carousel with 3 slides', () => {
    const { getAllByRole } = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
    expect(getAllByRole('slide')).toHaveLength(3)
})
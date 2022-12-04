import React, { Component } from 'react'
import { Slide, Wrapper } from './'
import PropTypes from 'prop-types'

function mod(a: number, b: number) {
    return ((a % b) + b) % b
}

interface Slide {
    key: number
    title: string
    text1: string
    text2: string
    label: string
    link: string
    reverse: boolean
}

interface VerticalCarouselProps {
    slides: Slide[]
    offsetRadius: number
    showNavigation: boolean
    animationConfig: any
}
interface Slide {
    key: number
    title: string
    text1: string
    text2: string
    label: string
    link: string
    reverse: boolean
}

class VerticalCarousel extends Component<VerticalCarouselProps> {
    state = {
        index: 0,
        goToSlide: 0,
        prevPropsGoToSlide: 0,
        newSlide: false,
    }

    componentDidMount = () => {
        window.addEventListener('wheel', this.handleScroll, true)
    }

    handleScroll = (e: WheelEvent) => {
        if (e.deltaY > 0) {
            this.moveSlide(-1)
        } else {
            this.moveSlide(1)
        }
    }

    static propTypes = {
        slides: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.any,
                content: PropTypes.string,
            })
        ).isRequired,
        goToSlide: PropTypes.number,
        showNavigation: PropTypes.bool,
        offsetRadius: PropTypes.number,
        animationConfig: PropTypes.object,
    }

    static defaultProps = {
        offsetRadius: 2,
        animationConfig: { tension: 120, friction: 14 },
    }

    modBySlidesLength = (index: number) => {
        return mod(index, this.props.slides.length)
    }

    moveSlide = (direction: number) => {
        this.setState({
            index: this.modBySlidesLength(this.state.index + direction),
            goToSlide: null,
        })
    }

    clampOffsetRadius(offsetRadius: number) {
        const { slides } = this.props
        const upperBound = Math.floor((slides.length - 1) / 2)

        if (offsetRadius < 0) {
            return 0
        }
        if (offsetRadius > upperBound) {
            return upperBound
        }

        return offsetRadius
    }

    getPresentableSlides() {
        const { slides } = this.props
        const { index } = this.state
        let { offsetRadius } = this.props
        offsetRadius = this.clampOffsetRadius(offsetRadius)
        const presentableSlides = []

        for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
            presentableSlides.push(slides[this.modBySlidesLength(index + i)])
        }

        return presentableSlides
    }

    render() {
        const { animationConfig, offsetRadius } = this.props
        return (
            <React.Fragment>
                <div role={'verticalCarousel'}>
                    <Wrapper>
                        {this.getPresentableSlides().map((slide, presentableIndex) => (
                            <Slide
                                key={slide.key}
                                title={slide.title}
                                text1={slide.text1}
                                text2={slide.text2}
                                label={slide.label}
                                link={slide.link}
                                reverse={slide.reverse}
                                moveSlide={this.moveSlide}
                                offsetRadius={this.clampOffsetRadius(offsetRadius)}
                                index={presentableIndex}
                                animationConfig={animationConfig}
                            />
                        ))}
                    </Wrapper>
                </div>
            </React.Fragment>
        )
    }
}

export default VerticalCarousel

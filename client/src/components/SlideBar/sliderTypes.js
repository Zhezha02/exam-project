import React from 'react'

export const MainSlide = props => (
  <img src={props.src} alt={'slide'} className={props.className} />
)

export const ExampleSlide = props => (
  <div className={props.className}>
    <img src={props.src} alt={'slide'} />
    <p>{props.data}</p>
  </div>
)

export const FeedbackSlide = props => (
  <div className={props.className}>
    <img src={props.src} alt={'slide'} />
    <p>{props.data.feedback}</p>
    <span>{props.data.name}</span>
  </div>
)

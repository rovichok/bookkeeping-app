# UI Panache Guardrails

This document defines what “adding panache” means for Lentis without changing the approved design.

## Objective

Enhance the feel of the existing interface without altering the approved design, structure, information, or visual direction.

Panache should mean polish, not redesign.

## Allowed Additions

The following additions are allowed:

- soft hover transitions
- subtle button lift or motion
- gentle section entrance animations
- cleaner focus states for accessibility
- slightly refined shadows
- smoother interaction timing
- restrained micro-interactions

## Not Allowed

The following changes are out of scope:

- changing the layout
- changing section order
- changing content
- changing typography system
- changing spacing system
- changing the color palette in a noticeable way
- adding flashy or distracting animation
- replacing existing visual direction

## Motion Standard

Motion should be:

- subtle
- fast
- calm
- professional
- optional-feeling rather than attention-seeking

Avoid:

- bouncing
- exaggerated parallax
- large transforms
- constant motion
- animation on every element

## Practical Rule

A visitor familiar with the current design should feel that the site is more polished, but should not feel that the design itself changed.

## Branch Rule

All panache-related changes must happen in:

`feature/ui-panache`

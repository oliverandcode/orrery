# Astrology For Exoplanets

A Node.js/TypeScript application intended to speculate about the study of
astrology on planets outside the Earth's solar system: exoplanets. 

Our first extrasolar system: TRAPPIST-1. Our first exoplanet: TRAPPIST-1e. 

This is an early-stage project. Right now it is a database layer only:
it defines the data model, creates the tables, and seeds them with real
astronomical data. Future iterations will add chart calculation, star catalog
integration, and a user interface.

---

## Background

### A Note On Orreries

An (ORRERY)[https://en.wikipedia.org/wiki/Orrery] is a mechanical model of the solar system that illustrates or predicts the relative positions and motions of the planets and moons. The term is derived from a device produced circa 1712 by John Rowley and named for his patron Charles Boyle, 4th Earl of Orrery. Orreries are typically driven by a clockwork mechanism with a globe representing the sun at the center, and with a planet at the end of each of a series of arms. 

Since this app aims to be a model of another solar system, used to illustrate or predict the relative positions and motions of the planets and other bodies in that system, it is in a sense a "digital orrery." Calculating astrological charts for planets outside Earth's solar system is a whimsical exercise with little practical value but a lot to delight the mind; in the era of publicly available NASA data on the positions of the celestial bodies, a literal mechanical orrery has little practical value, but a lot of whimsy. 

### Our Chosen Exoplanet

TRAPPIST-1 is a red dwarf star approximately 40 light-years from Earth,
host to seven known planets. TRAPPIST-1e is the fifth planet — likely
tidally locked (one hemisphere permanently facing the star) and potentially
habitable.

This project builds an astrological system rooted in that world:

- **Ecliptic**: the plane of TRAPPIST-1e's orbit projected onto the
  background star field. This plays the role that Earth's ecliptic does
  in traditional astrology.
- **12 sections**: the ecliptic band (±8° around the ecliptic) is divided
  into 12 equal 30° arcs, analogous to the zodiac signs.
- **Zero point**: Section 1 begins where the ecliptic crosses the galactic
  plane in the direction of the galactic center.
- **Planets**: the six other TRAPPIST-1 planets (b, c, d, f, g, h) move
  through the 12 sections on timescales of hours to days, playing the role
  that Mercury, Venus, etc. play in Earth astrology.

---
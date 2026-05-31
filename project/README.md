# CG 2025/2026

## Group T10G03

| Name                       | Number    | E-Mail                   |
| -------------------------- | --------- | ------------------------ |
| Ana Belém Meireles Bilhoto | 202305035 | up202305035@edu.fe.up.pt |
| João Rodrigues Vila Cova   | 202307756 | up202307756@edu.fe.up.pt |
| Simão Pedro Silva Barbosa  | 202306609 | up202306609@edu.fe.up.pt |

## Description

A real-time 3D prairie scene rendered in WebGL using WebCGF framework. The player controls a covered wagon (prairie schooner) pulled by an animated horse across a prairie landscape. The objective is a survival challenge: collect hay bales scattered accross the map and deliver them to the barn to restore health points before they run out.

The scene features a natural prairie environment with: 
- a full sky dome with clouds;
- hills;
- scattered rocks and flowers;
- grass;
- trees;
- detailed barn with a circular delivery zone;
- fully animated wagon with steering, wheel mechanics and kinematic horse movement.

## How to Run

**Dependencies:** A modern browser with WebGL support.

```bash
# Clone the repository
git clone <repository_url>
cd project

# Serve locally
python3 -m http.server 8000
# or
npx serve .
# or
# Use the Live Server extension in VSCode

# Open in browser
http://localhost:8000
```

## Keyboard Controls

| Key | Action |
| --- | ------ |
| `W` | Accelerate forward |
| `S` | Reduce speed |
| `A` | Steer wheels left |
| `D` | Steer wheels right |
| `P` | Pick up nearby hay bale |
| `L` | Drop hay bale at barn |
| Mouse drag | Orbit camera |
| Mouse scroll | Zoom in/out |

## Implemented Features

### Base

- **Sky, Sun, Clouds**
   - Panoramic sky dome (half-sphere)
   - Directional sun light
   - Animated clouds drifting across the scene
   - **Advanced:** procedural animated cloud layer near sky sphere. 

- **Terrain, Ground, Scatter Elements**
   - Rolling prairie hills with terrain elevation
   - **Advanced:** procedural terrain - different every run
   - Textured ground with scatter elements distributed across the terrain (rocks, trees)
   - **Advanced:** Scatter elements are procedurally generated with varying sizes, placements and orientations

- **Flowers and Grass**
   - Parametric flowers with randomised stem height, petal count, leaf count, size and colour
   - **Avanced:** Procedural generation of all flower components
   - Dense grass patches that change colour based on the terrain (dead grass patches)
   - **Advanced:** Wind shader over grass

- **Wagon, Interaction, and Animation**
   - Barn with textures applied to walls roof and front part
   - Circular delivery zone in front of barn that changes colour
   - Hierarchical wagon model: cloth cover, wooden bed, front tongue, 4 wheels
   - Horse implemented in OBJ format
   - **Advanced:** Wagon with shader on cover and horse running animation
   - Forward movement with smooth acceleration and front wheel steering mechanics
   - Hay bale pickup and drop
   - **Advanced:** Kinematic horse movement (physics-based acceleration)

- **Collectible System and UI**
   - Hay bales scattered across the prairie
   - Wagon pickups and drops hay bales at the barn
   - Collisions with scattered elements using sphere bounds
   - DAT.gui interface: health points, collision damage, health restored, score

## Known Issues / Limitations

TODO: check here

## Screenshots

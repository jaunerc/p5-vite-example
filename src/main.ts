import './style.css'
import p5 from 'p5'


export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 400)
        p.background(0)
    }

    p.draw = () => {
        p.fill(255)
        p.ellipse(p.mouseX, p.mouseY, 50, 50)
    }
}


new p5(sketch, document.querySelector<HTMLDivElement>('#app')!)

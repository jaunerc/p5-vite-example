import './style.css'
import p5 from 'p5'
import {sketch} from "./sketch.ts";

new p5(sketch, document.querySelector<HTMLDivElement>('#app')!)

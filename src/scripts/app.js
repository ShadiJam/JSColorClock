import React from 'react'
import ReactDOM from 'react-dom'


document.head.innerHTML += `<style>

    *, *:after, *:before {
        transition: all .25s ease;
    }

    body {
        color: white;
        background-color: red;
        transition: background .25s ease;
    }
    h1 {
        position: fixed;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 15vw;
    }

    h1:after {
        content: attr(hex);
        display: block;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    h1:hover {
        color: transparent;
    }

    h1:hover:after {
        color: white;
        opacity: 1;
    }

    .bar {
        border-top: .5vw solid white;
        width: 100%;
        margin: 0 auto;
    }

</style>`

document.body.innerHTML += `
<div class="clock">
    <h1 hex="00:00:00">
        <span>hi there</span>
        <div class="bar">
    </h1>
</div>
`

var h1 = document.querySelector('.clock h1'),
    span = h1.querySelector('span'),
    bar = h1.querySelector('.bar')

const drawTime = (
    d,
    h=d.getHours(),
    m=d.getMinutes(),
    s=d.getSeconds()
) => {
    span.innerHTML = 
        [h,m,s]
        .map(x => x < 10 ? `0${x}` : x)
        .join(':')
}

const drawBar = (
    d,
    s=d.getSeconds()
) => {
    bar.style.width = Math.round(s/59*100)+'%'
}

// scale :: [int,int,int] -> #rrggbb
const scale = (h,m,s) => {
    const pctDay = h*60*60 + m*60 + s,
          totalDay = 24*60*60,
          actual = pctDay / totalDay,
          totalColors = Math.pow(255,3),
          result = Math.round(actual*totalColors).toString(16)

    return new Array(6-result.length)
            .fill(1).map(x => '0')
            .join('')
            + result
}

const scaleEach = (h,m,s) => {
    const ranges = [23,59,59]

    return [h,m,s]
        .map((x,i) => 255 * x/ranges[i])
        .map(x => Math.round(x))
        .map(x => x.toString(16).toUpperCase())
        .map(x => new Array(2-x.length)
                    .fill(1)
                    .map(x => '0')
                    .join('')
                    + x)
}

const drawColor = (
    d,
    h=d.getHours(),
    m=d.getMinutes(),
    s=d.getSeconds()
) => {
    const color = scaleEach(h,m,s)
    h1.setAttribute('hex', color.join(':'))
    document.body.style = `background: #${color.join('')};`
}

const draw = () => {
    const d = new Date
    drawTime(d)
    drawColor(d)
    drawBar(d)
}

setInterval(draw, 1000)
draw()


const app = function() {

	const Header = React.createClass({
		render: () => {
			return <h1></h1>
		}
	})

	ReactDOM.render(<Header/>,document.querySelector('.container'))
}

app()
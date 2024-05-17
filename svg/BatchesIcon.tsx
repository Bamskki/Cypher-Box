import * as React from "react"
import Svg, { G, Rect, Defs, Path } from 'react-native-svg';


const BatchesIcon = () => (
    <Svg width={35} height={31} fill="none">
        <G filter="url(#a)">
            <Rect width={14} height={14} x={4} y={17} fill="#D9D9D9" rx={4} />
            <Rect width={13} height={13} x={4.5} y={17.5} stroke="#fff" rx={3.5} />
        </G>
        <G filter="url(#b)">
            <Rect
                width={13}
                height={13}
                x={4.5}
                y={0.5}
                stroke="#fff"
                rx={3.5}
                shapeRendering="crispEdges"
            />
        </G>
        <G filter="url(#c)">
            <Path
                stroke="#fff"
                d="M24 .5h6A3.5 3.5 0 0 1 33.5 4v6a3.5 3.5 0 0 1-3.5 3.5h-6a3.5 3.5 0 0 1-3.5-3.5V4A3.5 3.5 0 0 1 24 .5Z"
                shapeRendering="crispEdges"
            />
        </G>
        <G filter="url(#d)">
            <Rect width={14} height={14} x={20} y={17} fill="#D9D9D9" rx={4} />
            <Rect width={13} height={13} x={20.5} y={17.5} stroke="#fff" rx={3.5} />
        </G>
        <Defs></Defs>
    </Svg>
)


export default BatchesIcon;




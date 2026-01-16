import { SVGAttributes } from 'react';

export default function DashboardIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || "24"}
            height={props.height || "24"}
            {...props}
        >
            <rect x="3" y="3" width="7" height="9" rx="1" />
            <rect x="3" y="15" width="7" height="6" rx="1" />
            <rect x="14" y="3" width="7" height="5" rx="1" />
            <rect x="14" y="11" width="7" height="10" rx="1" />
        </svg>
    );
}
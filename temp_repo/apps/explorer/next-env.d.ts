/// <reference types="next" />
/// <reference types="next/image" />

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                embedded?: boolean;
            };
            'a-sky': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                rotation?: string;
            };
        }
    }
}

export {};

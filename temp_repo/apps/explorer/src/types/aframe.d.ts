import 'aframe';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'a-scene': any;
            'a-sky': any;
        }
    }
}
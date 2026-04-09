import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements extends React.JSX.IntrinsicElements {
      'a-scene': any;
      'a-sky': any;
    }
  }
}

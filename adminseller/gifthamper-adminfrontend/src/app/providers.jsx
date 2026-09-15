'use client';

import { Provider } from 'react-redux';
import { getStore } from './store';

export default function Providers({ children }) {
  return <Provider store={getStore()}>{children}</Provider>;
}

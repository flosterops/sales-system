import { MutableRefObject, useEffect, useState } from 'react';

export function useIsFocused(ref: MutableRefObject<any>): boolean {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('focus', handleFocus);
      ref.current.addEventListener('blur', handleBlur);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', handleFocus);
        ref.current.removeEventListener('blur', handleBlur);
      }
    };
  }, [ref]);

  return isFocused;
}

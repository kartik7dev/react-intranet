import { useEffect } from "react";
export const useRestrictCopyPaste = (props) => {
    const { window, actions } = props;
  
    useEffect(() => {
      actions?.forEach((action) => {
        action && window.addEventListener(action, preventPaste);
      });
  
      return () => {
        actions.forEach((action) => {
          action && window.removeEventListener(action, preventPaste);
        });
      };
    }, [window, actions]);
  
    const preventPaste = (e) => {
      alert("Copying and pasting is not allowed!");
      e.preventDefault();
    };
  };
export const setClassName = (className) => {
  const root = document.getElementsByTagName( 'html' )[0];

  root.setAttribute( 'class', className );
};
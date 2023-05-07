export function Form(props) {
  const { children, onSubmit, ...other } = props;
  console.log("form ", onSubmit);
  return <form {...other}>{children}</form>;
}

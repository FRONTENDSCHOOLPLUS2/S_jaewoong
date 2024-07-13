import Button from "./Button";


function Submit({children, ...rest}){
  return <Button type="submit" {...rest}>{children}</Button>
}
export default Submit;
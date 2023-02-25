export type BtnPropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & React.ClassAttributes<HTMLButtonElement> & {
  children: string | React.ReactElement | React.ReactElement[],
  btnType: 'white' | 'white_fill',
}